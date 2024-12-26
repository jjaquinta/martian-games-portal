export class MGServices {
  static countryCodes = {};
  
  // Static method to add country
  static addCountry(code, name) {
    this.countryCodes[code] = name;
  }

  // Static block equivalent: Initialize and sort
  static initialize() {
    this.addCountry("AR", "Argentina");
    this.addCountry("AU", "Australia");
    this.addCountry("ES", "Estonia");
    this.addCountry("FI", "Finland");
    this.addCountry("MX", "Mexico");
    this.addCountry("PL", "Poland");
    this.addCountry("BE", "Belgium");
    this.addCountry("CA", "Canada");
    this.addCountry("FR", "France");
    this.addCountry("GR", "Greece");
    this.addCountry("KK", "Kazakhstan");
    this.addCountry("SZ", "Swaziland");
    this.addCountry("CZ", "Czechia");
    this.addCountry("DE", "Denmark");
    this.addCountry("GB", "Great Britain");
    this.addCountry("NL", "Netherlands");
    this.addCountry("PE", "Peru");
    this.addCountry("TR", "Turkey");
    this.addCountry("RU", "Russia");
    this.addCountry("UA", "Ukraine");
    this.addCountry("IT", "Italy");
    this.addCountry("SU", "Soviet Union");
    this.addCountry("IN", "India");
    this.addCountry("US", "USA");
  }

  // Get the country name by code (or return the code itself if not found)
  static getCountryName(code) {
    return this.countryCodes[code] || code;
  }

  static toLevel(game, xp) {
    let level = Math.floor(Math.sqrt(xp) / 50.0);
    if (game === "AirWars2") {
      level = Math.floor(level/2);
    }
    return level;
  }

  static toDate(time) {
    const date = new Date(time);
    return date.toLocaleDateString();
  }

  static toDateTime(time) {
    const date = new Date(time);
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    return `${dateString} ${timeString}`;
  }
  
}

// Initialize the country data when the module is loaded
MGServices.initialize();
