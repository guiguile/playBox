package demographicInfo;

public class EmploymentInfo {
    private String occupation;
    private String industry;
    private double annualIncome;
    private int yearsOfExperience;
    private boolean isEmployed;

    public EmploymentInfo(String occupation, String industry, double income, int experience, boolean employed) {
        this.occupation = occupation;
        this.industry = industry;
        this.annualIncome = income;
        this.yearsOfExperience = experience;
        this.isEmployed = employed;
    }

    // Getters
    public String getOccupation() { return occupation; }
    public String getIndustry() { return industry; }
    public double getAnnualIncome() { return annualIncome; }  // <-- ADDED THIS
    public int getYearsOfExperience() { return yearsOfExperience; }
    public boolean isEmployed() { return isEmployed; }

    // Setters
    public void setAnnualIncome(double annualIncome) { this.annualIncome = annualIncome; }
    public void setOccupation(String occupation) { this.occupation = occupation; }

    public String getTaxBracket() {
        if (annualIncome < 30000) return "Low";
        if (annualIncome < 80000) return "Medium";
        return "High";
    }

    public void giveRaise(double percentage) {
        annualIncome *= (1 + percentage / 100);
    }

    @Override
    public String toString() {
        if (!isEmployed) return "Unemployed";
        return occupation + " in " + industry + 
               ", Income: $" + String.format("%,.2f", annualIncome) +
               " (" + getTaxBracket() + " bracket), " + 
               yearsOfExperience + " years experience";
    }
}