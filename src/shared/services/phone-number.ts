export class PhoneNumberFormat {

  public formatPhoneNumber(phoneNumber: string): string {
    try {
      // Remove all non-numeric characters
      const cleaned = phoneNumber.replace(/\D/g, '');
      if (cleaned.length < 9) {
        throw new Error('Invalid phone number length. It should contain exactly 9 digits. '+ phoneNumber);
      }
      // Format the cleaned number into 076 423 1205
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{3,4})$/);
      if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
      }
      return phoneNumber;
    } catch (error) {
      console.log('Cannot format this phone number: ', error)
      console.log('Cannot format this phone number: ', phoneNumber)
      return phoneNumber;
    }
  }
}