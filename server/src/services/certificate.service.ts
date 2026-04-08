export class CertificateService {
  static async getStatus(vin: string) {
    return [{
      vin: vin,
      details: "2020 Honda City",
      score: 97,
      verifiedOwner: true,
      mileage: "34,200 km",
      certId: "ODOSH-2024-TVC-00812",
      resaleWithout: "₹6.2L",
      resaleWith: "₹6.7L–₹6.9L",
      resaleBoostPct: 8
    }];
  }

  static async getVerification(vin: string) {
    return [{
      progressPct: 70,
      lastVerified: "Jan 2024",
      nextDue: "Jul 2024"
    }];
  }
}
