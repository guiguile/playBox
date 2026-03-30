package demographicInfo;

public class Person {
    private PersonalInfo personal;
    private EmploymentInfo employment;
    private ContactInfo contact;
    private EducationInfo education;

    public Person(PersonalInfo personal, EmploymentInfo employment, 
                  ContactInfo contact, EducationInfo education) {
        this.personal = personal;
        this.employment = employment;
        this.contact = contact;
        this.education = education;
    }

    // Getters for each component
    public PersonalInfo getPersonal() { return personal; }
    public EmploymentInfo getEmployment() { return employment; }
    public ContactInfo getContact() { return contact; }
    public EducationInfo getEducation() { return education; }

    // Utility methods that use multiple aspects
    public double calculateDisposableIncome() {
        double taxRate = 0.20; // Simplified 20% tax
        if (employment != null && employment.getTaxBracket().equals("High")) {
            taxRate = 0.35;
        }
        return employment != null ? employment.getAnnualIncome() * (1 - taxRate) : 0;
    }

    public void displayFullProfile() {
        System.out.println("========================================");
        System.out.println("PERSONAL INFORMATION:");
        System.out.println(personal);
        System.out.println("\nEMPLOYMENT INFORMATION:");
        System.out.println(employment);
        System.out.println("\nEDUCATION:");
        System.out.println(education);
        System.out.println("\nCONTACT INFORMATION:");
        System.out.println(contact);
        System.out.println("========================================\n");
    }
}
