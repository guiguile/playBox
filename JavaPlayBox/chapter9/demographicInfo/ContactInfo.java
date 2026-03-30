package demographicInfo;

public class ContactInfo {
    private String streetAddress;
    private String city;
    private String country;
    private String phoneNumber;
    private String email;

    public ContactInfo(String street, String city, String country, String phone, String email) {
        this.streetAddress = street;
        this.city = city;
        this.country = country;
        this.phoneNumber = phone;
        this.email = email;
    }

    public String getFullAddress() {
        return streetAddress + ", " + city + ", " + country;
    }

    public boolean isInternational(String referenceCountry) {
        return !country.equalsIgnoreCase(referenceCountry);
    }

    @Override
    public String toString() {
        return "Address: " + getFullAddress() + 
               "\nPhone: " + phoneNumber + 
               "\nEmail: " + email;
    }
}