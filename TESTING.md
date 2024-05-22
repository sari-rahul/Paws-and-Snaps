# Testing & Validation

- [Testing & Validation](#testing-validation)
   * [Validation](#validation)
      + [HTML Validation - W3C](#html-validation-w3c)
      + [CSS Validation - Jigsaw](#css-validation-jigsaw)
      + [JavaScript Validation - ESLint](#javascript-validation-eslint)
      + [Lighthouse Validation - Accessibility](#lighthouse-validation-accessibility)
   * [Testing](#testing)
      + [Manual Testing of User Stories](#manual-testing-of-user-stories)
      + [Responsiveness](#responsiveness)
      + [Browser compatibility](#browser-compatibility)

## Validation

The Paws&Snaps site has been passed through the following validators: 
- [WC3 HTML Validator](https://validator.w3.org/)
- [W3C Jigsaw CSS Validator](https://jigsaw.w3.org/css-validator/)
- [ESLint JavaScript Validator](https://eslint.org/)
- [Google Chrome Lighthouse Validator](https://developer.chrome.com/docs/lighthouse/overview/).

### HTML Validation - W3C

![W3C validation report](docs/readme/W3Chtmlvalidation.png)


[Back to top](#testing--validation)

### CSS Validation - Jigsaw

![Jigsaw validation report](docs/readme/jigsawvalidation.png)


[Back to top](#testing--validation)

### JavaScript Validation - ESLint

The ESLint validator plugin was used throughout development and no errors were present on final deployment

### Lighthouse Validation - Accessibility

The Chrome Lighthouse Dev Tool was used to test performance, accessibility, best practices and SEO on both desktop and mobile.

**Start here Page - Desktop**
![Start here page Lighthouse ](docs/readme/lighthousestartherepage.png)

**Add Article Page - Desktop**
![Add Article page Lighthouse ](docs/readme/lighthousearticlecreatepage.png)

**News Page - Desktop**
![News page Lighthouse ](docs/readme/lighthousenewspage.png)

**Article Page - Desktop**
![Article page Lighthouse ](docs/readme/lighthousearticlepage.png)

**Profile Page - Desktop**
![Profile page Lighthouse ](docs/readme/lighthouseprofilepage.png)

**About Page - Desktop**
![About page Lighthouse ](docs/readme/lighthouseaboutpage.png)

**Signin Page - Desktop**
![Signin page Lighthouse ](docs/readme/lighthousesiginpage.png)

**Signup Page - Desktop**
![Signup page Lighthouse ](docs/readme/lighthousesignup.png)


### Responsiveness

All pages were tested to ensure responsiveness on screen sizes from 320px and upwards as defined in WCAG 2.1 Reflow criteria for responsive design on Chrome, Firefox and Safari.

Steps to test:

- Open browser and navigate to [Paws&Snaps](https://pawfect-pics-87d81c100ee5.herokuapp.com/)
- Open the developer tools (right click and inspect)
- Set to responsive and decrease width to 320px
- Click and drag the responsive window slowly to maximum width

Expected:

Website is responsive on all screen sizes and no images are pixelated or stretched. No horizontal scroll is present. No elements overlap.

Actual:

Website behaved as expected.

[Back to top](#testing--validation)

### Browser compatibility

Testing has been carried out on the following browsers:

- Google Chrome
- Firefox
- Safari

[Back to top](#testing--validation)
