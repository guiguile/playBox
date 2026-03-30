package demographicInfo;

public class PersonalInfo {
    private String name;
    private int age;
    private String nationality;
    private String gender;
    private String maritalStatus;

    public PersonalInfo(String name, int age, String nationality, String gender, String maritalStatus) {
        this.name = name;
        this.age = age;
        this.nationality = nationality;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
    }

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality;}
    public String getMaritalStatus(){ return maritalStatus;}
    public void setMaritalStatus(String maritalStatus){this.maritalStatus=maritalStatus;}
    
    public boolean isSenior() {
        return age >= 65;
    }

    @Override
    public String toString() {
        return name + ", " + age + " years old, " + nationality + 
               ", " + gender + ", " + maritalStatus;
    }
}