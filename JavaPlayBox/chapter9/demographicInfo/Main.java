package demographicInfo;

public class Main {
    public static void main(String[] args) {
        System.out.println("Demographic Information Tracking System\n");
        
        // Create Person 1
        PersonalInfo p1 = new PersonalInfo("Alice Johnson", 34, "American", "Female", "Married");
        EmploymentInfo e1 = new EmploymentInfo("Software Engineer", "Technology", 95000.00, 8, true);
        ContactInfo c1 = new ContactInfo("123 Maple St", "Seattle", "USA", "555-0123", "alice@email.com");
        EducationInfo ed1 = new EducationInfo("Bachelor of Science", "Computer Science", "MIT", 2015, false);
        
        Person person1 = new Person(p1, e1, c1, ed1);
        
        // Create Person 2
        PersonalInfo p2 = new PersonalInfo("Hans Müller", 67, "German", "Male", "Married");
        EmploymentInfo e2 = new EmploymentInfo("Retired Professor", "Education", 45000.00, 40, false);
        ContactInfo c2 = new ContactInfo("45 Berliner Str", "Munich", "Germany", "+49-89-1234", "hans@germanmail.de");
        EducationInfo ed2 = new EducationInfo("PhD", "Physics", "Technical University of Munich", 1985, true);
        
        Person person2 = new Person(p2, e2, c2, ed2);
        
        // Create Person 3 (Student/Unemployed)
        PersonalInfo p3 = new PersonalInfo("Maria Silva", 22, "Brazilian", "Female", "Single");
        EmploymentInfo e3 = new EmploymentInfo("None", "N/A", 0, 0, false);
        ContactInfo c3 = new ContactInfo("Rua das Flores 100", "São Paulo", "Brazil", "+55-11-98765", "maria@uni.br");
        EducationInfo ed3 = new EducationInfo("Bachelor (In Progress)", "Economics", "University of São Paulo", 2027, false);
        
        Person person3 = new Person(p3, e3, c3, ed3);
        
        // Display all profiles
        System.out.println("=== PERSON 1 ===");
        person1.displayFullProfile();
        
        System.out.println("=== PERSON 2 ===");
        person2.displayFullProfile();
        
        System.out.println("=== PERSON 3 (Student) ===");
        person3.displayFullProfile();
        
        // Exercise the classes with various operations
        System.out.println("=== DEMOGRAPHIC ANALYSIS ===\n");
        
        // Check senior status
        System.out.println(p1.getName() + " is senior? " + p1.isSenior());
        System.out.println(p2.getName() + " is senior? " + p2.isSenior());
        
        // Tax bracket analysis
        System.out.println("\n" + person1.getPersonal().getName() + "'s tax bracket: " + 
                          person1.getEmployment().getTaxBracket());
        System.out.println("Disposable income: $" + 
                          String.format("%,.2f", person1.calculateDisposableIncome()));
        
        // Give raise
        System.out.println("\nGiving Alice a 10% raise...");
        person1.getEmployment().giveRaise(10);
        System.out.println("New income: $" + 
                          String.format("%,.2f", person1.getEmployment().getAnnualIncome()));
        
        // International check
        System.out.println("\nIs " + p2.getName() + " international relative to USA? " + 
                          person2.getContact().isInternational("USA"));
        System.out.println("Is " + p1.getName() + " international relative to USA? " + 
                          person1.getContact().isInternational("USA"));
        
        // Education years
        System.out.println("\nYears since Hans graduated (2026): " + 
                          ed2.yearsSinceGraduation(2026) + " years");
        
        // Update information
        System.out.println("\n=== UPDATING INFORMATION ===");
        System.out.println("Before: " + p3.getName() + "'s status: " + p3.getMaritalStatus());
        p3.setMaritalStatus("Married");
        System.out.println("After: " + p3.getName() + "'s status: " + p3.getMaritalStatus());
    }
}