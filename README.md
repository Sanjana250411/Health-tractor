# Health Tracker - BMI Calculator

A modern, highly responsive, and professional Body Mass Index (BMI) Calculator application. This single-page application features interactive vector illustrations, real-time input validation, animated counters, custom gauge graphics, celebratory confetti, and full dark-mode integration.

## 🌟 Features

- **Unit Conversions**: Supports Centimeters, Meters, and Feet & Inches for height, and Kilograms and Pounds for weight.
- **Form Validation**: Provides real-time and submission checks with helpful error states for age, weight, and height bounds.
- **Dynamic BMI Gauge**: A colorful vector semi-circular gauge that rotates its pointer needle dynamically based on your calculated score.
- **Celebratory Confetti**: Emits lightweight React-driven floating confetti particles when you achieve a "Normal Weight" BMI rating.
- **Educational Guide**: Includes an interactive tabbed guide detailing "What is BMI?", mathematical formulas, screening advantages, and biological limitations.
- **6 Lifestyle Tip Cards**: Offers personalized lifestyle recommendations and elegant responsive cards focusing on hydration, diet, exercise, stress, sleep, and sugar intake.
- **Interactive Contact Form**: Features a form equipped with error handling and a successful submission checklist state.
- **Fully Accessible**: Implements proper contrast ratios, native semantic elements, keyboard focus rings, and responsive typography.
- **Light / Dark Mode**: Offers a synchronized system-preference and manual theme toggle.

---

## 🛠️ Technology Used

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6 (HMR configured for development environments)
- **Styling**: Tailwind CSS v4 (with custom `@theme` typography injections)
- **Icons**: Lucide React
- **Animations**: CSS Animations, custom high-performance RequestAnimationFrame particles, and smooth layout easing.

---

## 🚀 Installation & Local Development

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and npm installed.

### Steps
1. **Clone or Extract the Workspace**:
   ```bash
   cd Health-Tracker
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

4. **Compile the Applet**:
   To test for typescript type safety and production build output:
   ```bash
   npm run build
   ```

---

## 📐 Mathematical Formulas

The system converts input fields dynamically to metric values before computing the final BMI:

- **Metric Standard**:
  $$\text{BMI} = \frac{\text{Weight (kg)}}{\text{Height (m)}^2}$$

- **Imperial Conversion**:
  - Height: $(\text{Feet} \times 12) + \text{Inches} \rightarrow \text{Meters}$
  - Weight: $\text{Pounds} \times 0.45359237 \rightarrow \text{Kilograms}$

---

## 🔮 Future Enhancements

- **BMI History Log**: Persist prior reports in a visual timeline.
- **Firebase Auth**: Secure client login to sync profiles across devices.
- **Water Tracker**: Quick log buttons to reach daily water targets.
- **PDF Report Download**: Export custom nutritional charts and BMI diagnostics.

---

## 📝 License
This project is licensed under the Apache 2.0 License. See the header declarations in the source files for details.
