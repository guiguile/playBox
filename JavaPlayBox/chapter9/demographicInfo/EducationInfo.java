package demographicInfo;

public class EducationInfo {
    private String highestDegree;
    private String fieldOfStudy;
    private String university;
    private int graduationYear;
    private boolean hasGraduateDegree;

    public EducationInfo(String degree, String field, String uni, int year, boolean gradDegree) {
        this.highestDegree = degree;
        this.fieldOfStudy = field;
        this.university = uni;
        this.graduationYear = year;
        this.hasGraduateDegree = gradDegree;
    }

    public int yearsSinceGraduation(int currentYear) {
        return currentYear - graduationYear;
    }

    @Override
    public String toString() {
        return highestDegree + " in " + fieldOfStudy + 
               " from " + university + " (" + graduationYear + ")";
    }
}