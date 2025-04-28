import java.io.*;
import java.nio.file.*;
import java.util.*;

public class CsvToJsonConverter {

    static class Section {
        String sectionName;
        String sectionId;
        String teacherSection;
        String extendedSection;
        String visible;
        List<Page> childPages = new ArrayList<>();

        Section(String sectionName, String sectionId, String teacherSection, String extendedSection, String visible) {
            this.sectionName = sectionName;
            this.sectionId = sectionId;
            this.teacherSection = teacherSection.toLowerCase();
            this.extendedSection = extendedSection.toLowerCase();
            this.visible = visible.toLowerCase();
        }
    }

    static class Page {
        String pageName;
        String pageUrl;
        String markDown;
        String pageId;
        String pageVersion;
        String teacherSection;
        String extendedSection;
        String visible;
        String parentSectionId; // To link with section

        Page(String pageName, String pageUrl, String markDown, String pageId, String pageVersion,
             String teacherSection, String extendedSection, String visible, String parentSectionId) {
            this.pageName = pageName;
            this.pageUrl = pageUrl;
            this.markDown = markDown;
            this.pageId = pageId;
            this.pageVersion = pageVersion;
            this.teacherSection = teacherSection.toLowerCase();
            this.extendedSection = extendedSection.toLowerCase();
            this.visible = visible.toLowerCase();
            this.parentSectionId = parentSectionId;
        }
    }

    public static void main(String[] args) {
        if (args.length != 2) {
            System.out.println("Usage: java CsvToJsonConverter <input-csv-file> <output-json-file>");
            System.exit(1);
        }

        String inputFileName = args[0];
        String outputFileName = args[1];

        try {
            List<Map<String, String>> csvRows = readCSV(inputFileName);
            if (csvRows.isEmpty()) {
                System.out.println("CSV file is empty or only contains headers.");
                return;
            }

            // Validate CSV rows
            List<String> validationErrors = validateRows(csvRows);
            if (!validationErrors.isEmpty()) {
                System.out.println("Validation errors found:");
                for (String err : validationErrors) {
                    System.out.println(err);
                }
                System.out.println("JSON creation aborted due to validation errors.");
                return;
            }

            Map<String, Section> sections = new LinkedHashMap<>();
            Map<String, Page> pagesById = new LinkedHashMap<>();

            // Filter rows: only active-version = TRUE
            List<Map<String, String>> activeRows = filterActiveVersionRows(csvRows);

            // Populate sections and pages
            Set<String> pageIdSet = new HashSet<>();
            for (Map<String, String> row : activeRows) {
                if ("Section".equalsIgnoreCase(row.get("Type"))) {
                    String secName = row.get("section-name/page-name");
                    String secId = row.get("section-id/page-id");
                    sections.putIfAbsent(secId, new Section(
                            secName,
                            secId,
                            row.get("teacher-section"),
                            row.get("extended-section"),
                            row.get("visible")));
                }
            }
            // Add pages
            for (Map<String, String> row : activeRows) {
                if ("Page".equalsIgnoreCase(row.get("Type"))) {
                    String pageId = row.get("section-id/page-id");
                    // There can be only one active version per page-id check was done in validation

                    String parentSectionId = row.get("Parent");
                    if (!sections.containsKey(parentSectionId)) {
                        // This may be error or ignore? 
                        System.out.println("Warning: Parent section '" + parentSectionId + "' not found for page '" + pageId + "'. Skipping page.");
                        continue;
                    }

                    Page page = new Page(
                            row.get("section-name/page-name"),
                            row.get("page-url"),
                            row.get("mark-down"),
                            pageId,
                            row.get("page-version"),
                            row.get("teacher-section"),
                            row.get("extended-section"),
                            row.get("visible"),
                            parentSectionId
                    );
                    pagesById.put(pageId, page);
                    sections.get(parentSectionId).childPages.add(page);
                }
            }

            // Create JSON output
            String jsonOutput = buildJson(sections);
            writeToFile(outputFileName, jsonOutput);
            System.out.println("JSON file created: " + outputFileName);

            // Create boilerplate markdown files under "content" folder
            createBoilerplateMdFiles(pagesById);

            System.out.println("Boilerplate markdown files created under 'content' folder.");

        } catch (Exception e) {
            System.out.println("Error occurred: " + e.getMessage());
            e.printStackTrace();
        }
    }


    private static List<Map<String, String>> readCSV(String fileName) throws IOException {
        List<Map<String, String>> rows = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String headerLine = br.readLine();
            if (headerLine == null) return rows;
            String[] headers = splitCSVLine(headerLine);

            String line;
            while ((line = br.readLine()) != null) {
                String[] cols = splitCSVLine(line);
                if (cols.length != headers.length) {
                    // skip or error
                    System.out.println("Warning: Skipping invalid CSV line: " + line);
                    continue;
                }
                Map<String, String> rowMap = new HashMap<>();
                for (int i = 0; i < headers.length; i++) {
                    rowMap.put(headers[i].trim(), cols[i].trim());
                }
                rows.add(rowMap);
            }
        }
        return rows;
    }

    // Basic CSV splitter - no support for quoted commas.
    private static String[] splitCSVLine(String line) {
        return line.split(",", -1);
    }

    private static List<String> validateRows(List<Map<String, String>> rows) {
        List<String> errors = new ArrayList<>();

        // Validate unique section-id/page-id
        Set<String> ids = new HashSet<>();
        for (Map<String, String> row : rows) {
            String id = row.get("section-id/page-id");
            if (ids.contains(id)) {
                // Could be OK if different versions for same page-id?
                // But only one active version per page & id uniqueness:
                // We'll check the active version rule separately.
            } else {
                ids.add(id);
            }
        }

        // Validate fields for each row
        // Collect page versions by page id
        Map<String, List<Map<String, String>>> pagesByPageId = new HashMap<>();

        for (int i = 0; i < rows.size(); i++) {
            Map<String, String> row = rows.get(i);
            String type = row.get("Type");
            if (type == null) {
                errors.add("Row " + (i + 2) + ": Missing Type field.");
                continue;
            }
            if ("Section".equalsIgnoreCase(type)) {
                // Required fields: Type, section-name/page-name, section-id/page-id, teacher-section, extended-section, visible
                for (String field : new String[]{"section-name/page-name", "section-id/page-id", "teacher-section",
                        "extended-section", "visible"}) {
                    if (!row.containsKey(field) || row.get(field).isEmpty()) {
                        errors.add("Row " + (i + 2) + " (Section): Missing or empty required field '" + field + "'");
                    }
                }
                // No active-version field validation for Section as it can be empty or?
                // The csv sample had active-version for section, but rule is only for pages?
            } else if ("Page".equalsIgnoreCase(type)) {
                // Required fields: Type,section-name/page-name,section-id/page-id,page-url,mark-down,page-version,teacher-section,extended-section,visible,Parent,active-version
                for (String field : new String[]{"section-name/page-name", "section-id/page-id", "page-url",
                        "mark-down", "page-version", "teacher-section", "extended-section", "visible", "Parent", "active-version"}) {
                    if (!row.containsKey(field) || row.get(field).isEmpty()) {
                        errors.add("Row " + (i + 2) + " (Page): Missing or empty required field '" + field + "'");
                    }
                }
                if (!row.get("active-version").equalsIgnoreCase("true") && !row.get("active-version").equalsIgnoreCase("false")) {
                    errors.add("Row " + (i + 2) + " (Page): active-version must be 'TRUE' or 'FALSE'");
                }

                // Add to pagesByPageId for checking active version uniqueness
                pagesByPageId.computeIfAbsent(row.get("section-id/page-id"), k -> new ArrayList<>()).add(row);
            } else {
                errors.add("Row " + (i + 2) + ": Invalid Type '" + type + "'");
            }
        }

        // Check only one active version per page
        for (Map.Entry<String, List<Map<String, String>>> entry : pagesByPageId.entrySet()) {
            long activeCount = entry.getValue().stream()
                    .filter(r -> "true".equalsIgnoreCase(r.get("active-version")))
                    .count();
            if (activeCount == 0) {
                errors.add("Page with page-id '" + entry.getKey() + "' has no active-version = TRUE");
            } else if (activeCount > 1) {
                errors.add("Page with page-id '" + entry.getKey() + "' has multiple active-version = TRUE");
            }
        }

        return errors;
    }

    private static List<Map<String, String>> filterActiveVersionRows(List<Map<String, String>> rows) {
        List<Map<String, String>> filtered = new ArrayList<>();

        // Sections do not have active-version only "Page" rows have this key
        for (Map<String, String> row : rows) {
            String type = row.get("Type");
            if ("Section".equalsIgnoreCase(type)) {
                filtered.add(row);
            } else if ("Page".equalsIgnoreCase(type)) {
                String activeVersion = row.get("active-version");
                if ("true".equalsIgnoreCase(activeVersion)) {
                    filtered.add(row);
                }
            }
        }
        return filtered;
    }

    private static String buildJson(Map<String, Section> sections) {
        StringBuilder sb = new StringBuilder();
        sb.append("[\n");
        Iterator<Section> sectionIter = sections.values().iterator();
        while (sectionIter.hasNext()) {
            Section s = sectionIter.next();
            sb.append("  {\n");
            sb.append("    \"section-name\": ").append(quote(s.sectionName)).append(",\n");
            sb.append("    \"section-id\": ").append(quote(s.sectionId)).append(",\n");
            sb.append("    \"teacher-section\": ").append(quote(s.teacherSection)).append(",\n");
            sb.append("    \"visible\": ").append(quote(s.visible)).append(",\n");
            sb.append("    \"extended-section\": ").append(quote(s.extendedSection)).append(",\n");
            sb.append("    \"child-pages\": [\n");
            Iterator<Page> pageIter = s.childPages.iterator();
            while (pageIter.hasNext()) {
                Page p = pageIter.next();
                sb.append("      {\n");
                sb.append("        \"page-name\": ").append(quote(p.pageName)).append(",\n");
                sb.append("        \"page-url\": ").append(quote(p.pageUrl)).append(",\n");
                sb.append("        \"mark-down\": ").append(quote(p.markDown)).append(",\n");
                sb.append("        \"page-id\": ").append(quote(p.pageId)).append(",\n");
                sb.append("        \"page-version\": ").append(quote(p.pageVersion)).append(",\n");
                sb.append("        \"teacher-section\": ").append(quote(p.teacherSection)).append(",\n");
                sb.append("        \"visible\": ").append(quote(p.visible)).append(",\n");
                sb.append("        \"extended-section\": ").append(quote(p.extendedSection)).append("\n");
                sb.append("      }");
                if (pageIter.hasNext()) {
                    sb.append(",");
                }
                sb.append("\n");
            }
            sb.append("    ]\n");
            sb.append("  }");
            if (sectionIter.hasNext()) {
                sb.append(",");
            }
            sb.append("\n");
        }
        sb.append("]\n");
        return sb.toString();
    }

    private static String quote(String s) {
        if (s == null) return "\"\"";
        return "\"" + s.replace("\"", "\\\"") + "\"";
    }

    private static void writeToFile(String fileName, String content) throws IOException {
        try(BufferedWriter bw = new BufferedWriter(new FileWriter(fileName))) {
            bw.write(content);
        }
    }

    private static void createBoilerplateMdFiles(Map<String, Page> pagesById) throws IOException {
        Path contentRoot = Paths.get("content");
        if (!Files.exists(contentRoot)) {
            Files.createDirectory(contentRoot);
        }

        for (Page page : pagesById.values()) {
            if (page.markDown == null || page.markDown.isEmpty()) {
                System.out.println("Warning: Empty mark-down path for page " + page.pageId + ". Skipping md file creation.");
                continue;
            }
            // parse markdown path
            String mdPath = page.markDown.replace('\\', '/');

            // Extract directory and filename
            int lastSlash = mdPath.lastIndexOf('/');
            String dir = "";
            String mdFileName = mdPath;
            if (lastSlash >= 0) {
                dir = mdPath.substring(0, lastSlash);
                mdFileName = mdPath.substring(lastSlash + 1);
            }

            // Remove extension from mdFileName to get prefix
            String prefix = mdFileName;
            int lastDot = mdFileName.lastIndexOf('.');
            if (lastDot > 0) {
                prefix = mdFileName.substring(0, lastDot);
            }

            // Construct output md filename
            String outputFileName = prefix + "-" + page.pageId + "-" + page.pageVersion + ".md";

            // Create directory inside content folder
            Path dirPath = contentRoot;
            if (!dir.isEmpty()) {
                dirPath = contentRoot.resolve(dir);
                if (!Files.exists(dirPath)) {
                    Files.createDirectories(dirPath);
                }
            }

            Path outFile = dirPath.resolve(outputFileName);

            try (BufferedWriter bw = Files.newBufferedWriter(outFile)) {
                bw.write("# " + page.pageName + "\n");
            }
        }
    }
}