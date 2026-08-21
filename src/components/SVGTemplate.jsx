import React from 'react';
import { replacePlaceholders } from '../utils/placeholderUtils';
import { LOGO_BASE64 } from '../assets/logoBase64';

// SVG Decorative Top Banner Header used across pages with Official Logo
const HeaderBanner = ({ title = "S.K. POWERTECH", placeholders }) => (
  <g transform="translate(0, 0)">
    {/* Background Shapes */}
    <path d="M 0,0 L 794,0 L 794,80 L 420,80 L 380,125 L 0,125 Z" fill="#053763" />
    <path d="M 220,0 L 320,0 L 260,80 L 160,80 Z" fill="#FFC700" />
    <path d="M 500,0 L 640,0 L 560,125 L 420,125 Z" fill="#FFC700" opacity="0.9" />

    {/* Official SK PowerTech Logo Image in Header */}
    <g transform="translate(20, 10)">
      <rect x="0" y="0" width="160" height="70" fill="#ffffff" rx="6" opacity="0.95" />
      <image href={LOGO_BASE64} x="5" y="5" width="150" height="60" preserveAspectRatio="xMidYMid meet" />
    </g>

    {/* Document Title Ribbon if specified */}
    {title && (
      <g transform="translate(420, 160)" textAnchor="middle">
        <rect x="-220" y="-22" width="440" height="44" fill="#ffffff" stroke="#FFC700" strokeWidth="3" rx="4" />
        <text x="0" y="8" fill="#053763" fontSize="22" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">
          {title}
        </text>
      </g>
    )}
  </g>
);

// Standard Footer Bar across content pages using dynamic placeholders address
const FooterBar = ({ placeholders }) => (
  <g transform="translate(0, 1073)">
    <rect x="0" y="0" width="794" height="50" fill="#053763" />
    <text x="397" y="30" fill="#ffffff" fontSize="12" fontWeight="500" fontFamily="sans-serif" textAnchor="middle">
      {placeholders?.MOBILE_NO || '+91 93666 53164 / +91 63821 42274'} &nbsp;|&nbsp; {placeholders?.ADDRESS || 'Near vishnu mahal, Poolanginaru, Mukkonam, Udumalaipettai, Tamil Nadu 642122'}
    </text>
  </g>
);

/**
 * PAGE 1: COVER PAGE
 */
export const CoverPage = ({ placeholders }) => (
  <div data-quotation-page="true" className="w-[794px] h-[1123px] bg-white relative shadow-lg overflow-hidden flex-shrink-0">
    <svg viewBox="0 0 794 1123" className="w-full h-full">
      {/* Background Dark Blue Top & Yellow Curved Design */}
      <path d="M 0,0 L 794,0 L 794,380 C 600,420 400,340 0,420 Z" fill="#053763" />
      
      {/* Dynamic Curved Yellow Body */}
      <path d="M 0,400 C 350,320 500,480 794,380 L 794,920 C 500,980 200,900 0,940 Z" fill="#FFC700" />
      
      {/* Central Official Logo Presentation Card */}
      <g transform="translate(140, 60)">
        {/* Large Central Circle Badge */}
        <circle cx="250" cy="180" r="160" fill="#ffffff" stroke="#053763" strokeWidth="8" />
        
        {/* Official SK PowerTech Logo Image inside circle */}
        <g transform="translate(125, 65)">
          <image href={LOGO_BASE64} x="0" y="0" width="250" height="150" preserveAspectRatio="xMidYMid meet" />
        </g>
        <text x="250" y="270" fill="#053763" fontSize="24" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
          S.K. POWERTECH
        </text>
        <text x="250" y="295" fill="#D97706" fontSize="13" fontWeight="bold" textAnchor="middle" letterSpacing="2">
          SOLAR &amp; UPS SOLUTIONS
        </text>

        {/* Small Left Circle Badge */}
        <circle cx="60" cy="240" r="75" fill="#ffffff" stroke="#053763" strokeWidth="6" />
        <circle cx="60" cy="240" r="68" fill="#0A4D80" />
        <text x="60" y="248" fill="#ffffff" fontSize="26" textAnchor="middle" fontWeight="bold">SOLAR</text>
      </g>

      {/* Main Title Badge */}
      <g transform="translate(397, 600)" textAnchor="middle">
        <rect x="-270" y="-50" width="540" height="100" fill="#ffffff" rx="8" shadow="true" stroke="#053763" strokeWidth="2" />
        <text x="0" y="-10" fill="#053763" fontSize="34" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">
          {placeholders.COMPANY_NAME}
        </text>
        <text x="0" y="25" fill="#D97706" fontSize="18" fontWeight="bold" fontFamily="sans-serif" letterSpacing="3">
          {placeholders.COMPANY_SUBHEAD}
        </text>
      </g>

      {/* Client Designation Card on Cover */}
      <g transform="translate(397, 725)" textAnchor="middle">
        <rect x="-200" y="-25" width="400" height="50" fill="#053763" rx="25" />
        <text x="0" y="6" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="sans-serif">
          PREPARED FOR: {placeholders.CLIENT_NAME}
        </text>
      </g>

      {/* 3 Key Values Badges */}
      <g transform="translate(100, 810)">
        {/* Badge 1 */}
        <g transform="translate(40, 0)">
          <circle cx="45" cy="45" r="35" fill="#ffffff" stroke="#053763" strokeWidth="3" />
          <path d="M 30,45 L 40,55 L 60,35" fill="none" stroke="#053763" strokeWidth="4" strokeLinecap="round" />
          <text x="45" y="102" fill="#053763" fontSize="13" fontWeight="bold" textAnchor="middle">EXPERIENCED</text>
          <text x="45" y="118" fill="#053763" fontSize="13" fontWeight="bold" textAnchor="middle">PROFESSIONALS</text>
        </g>

        {/* Badge 2 */}
        <g transform="translate(250, 0)">
          <circle cx="45" cy="45" r="35" fill="#ffffff" stroke="#053763" strokeWidth="3" />
          <polygon points="45,20 52,35 68,37 56,49 60,65 45,56 30,65 34,49 22,37 38,35" fill="#053763" />
          <text x="45" y="102" fill="#053763" fontSize="13" fontWeight="bold" textAnchor="middle">HIGH QUALITY</text>
          <text x="45" y="118" fill="#053763" fontSize="13" fontWeight="bold" textAnchor="middle">PRODUCTS</text>
        </g>

        {/* Badge 3 */}
        <g transform="translate(460, 0)">
          <circle cx="45" cy="45" r="35" fill="#ffffff" stroke="#053763" strokeWidth="3" />
          <path d="M 30,55 C 30,35 60,35 60,55 Z" fill="#053763" />
          <circle cx="45" cy="32" r="10" fill="#053763" />
          <text x="45" y="102" fill="#053763" fontSize="13" fontWeight="bold" textAnchor="middle">EXCEPTIONAL</text>
          <text x="45" y="118" fill="#053763" fontSize="13" fontWeight="bold" textAnchor="middle">CUSTOMER SERVICE</text>
        </g>
      </g>

      {/* Bottom Phone Pill */}
      <g transform="translate(397, 980)" textAnchor="middle">
        <rect x="-260" y="-22" width="520" height="44" fill="#ffffff" stroke="#FFC700" strokeWidth="3" rx="22" />
        <text x="0" y="6" fill="#053763" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
          {placeholders.MOBILE_NO}
        </text>
      </g>
    </svg>
  </div>
);

/**
 * PAGE 2: CLIENT INFO & QUOTATION HEADER
 */
export const ClientInfoPage = ({ placeholders }) => (
  <div data-quotation-page="true" className="w-[794px] h-[1123px] bg-white relative shadow-lg overflow-hidden flex-shrink-0">
    <svg viewBox="0 0 794 1123" className="w-full h-full">
      <HeaderBanner title={placeholders.COMPANY_NAME} placeholders={placeholders} />

      {/* Main Quotation Details Box */}
      <g transform="translate(80, 250)">
        {/* Table Container Border */}
        <rect x="0" y="0" width="634" height="340" fill="#053763" rx="4" />
        
        {/* Table Rows */}
        {/* Row 1: DATE */}
        <g transform="translate(0, 0)">
          <rect x="2" y="2" width="240" height="81" fill="#ffffff" />
          <rect x="244" y="2" width="388" height="81" fill="#ffffff" />
          <text x="120" y="48" fill="#053763" fontSize="18" fontWeight="bold" textAnchor="middle">DATE</text>
          <text x="438" y="48" fill="#1F2937" fontSize="18" fontWeight="bold" textAnchor="middle">{placeholders.DATE}</text>
        </g>

        {/* Row 2: CLIENT NAME */}
        <g transform="translate(0, 85)">
          <rect x="2" y="0" width="240" height="81" fill="#ffffff" />
          <rect x="244" y="0" width="388" height="81" fill="#ffffff" />
          <text x="120" y="48" fill="#053763" fontSize="18" fontWeight="bold" textAnchor="middle">CLIENT NAME</text>
          <text x="438" y="48" fill="#1F2937" fontSize="18" fontWeight="bold" textAnchor="middle">{placeholders.CLIENT_NAME}</text>
        </g>

        {/* Row 3: DOCUMENT NO */}
        <g transform="translate(0, 168)">
          <rect x="2" y="0" width="240" height="81" fill="#ffffff" />
          <rect x="244" y="0" width="388" height="81" fill="#ffffff" />
          <text x="120" y="48" fill="#053763" fontSize="18" fontWeight="bold" textAnchor="middle">DOCUMENT NO</text>
          <text x="438" y="48" fill="#1F2937" fontSize="18" fontWeight="bold" textAnchor="middle">{placeholders.DOC_NO}</text>
        </g>

        {/* Row 4: MOBILE NO */}
        <g transform="translate(0, 251)">
          <rect x="2" y="0" width="240" height="86" fill="#ffffff" />
          <rect x="244" y="0" width="388" height="86" fill="#ffffff" />
          <text x="120" y="48" fill="#053763" fontSize="18" fontWeight="bold" textAnchor="middle">MOBILE NO</text>
          <text x="438" y="48" fill="#1F2937" fontSize="17" fontWeight="bold" textAnchor="middle">{placeholders.MOBILE_NO}</text>
        </g>
      </g>

      {/* Decorative Capacity Highlight Card */}
      <g transform="translate(80, 640)">
        <rect x="0" y="0" width="634" height="200" fill="#F3F4F6" stroke="#053763" strokeWidth="2" rx="8" />
        <rect x="0" y="0" width="634" height="44" fill="#053763" />
        <text x="317" y="28" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">SOLAR SYSTEM PROPOSAL OVERVIEW</text>
        
        <text x="40" y="85" fill="#053763" fontSize="16" fontWeight="bold">Plant Capacity:</text>
        <text x="200" y="85" fill="#D97706" fontSize="18" fontWeight="bold">{placeholders.KW}</text>

        <text x="40" y="125" fill="#053763" fontSize="16" fontWeight="bold">Inverter System:</text>
        <text x="200" y="125" fill="#1F2937" fontSize="16" fontWeight="600">{placeholders.INVERTER_KW} – {placeholders.INVERTER_PHASE}</text>

        <text x="40" y="165" fill="#053763" fontSize="16" fontWeight="bold">Panel Specifications:</text>
        <text x="200" y="165" fill="#1F2937" fontSize="16" fontWeight="600">{placeholders.PANEL_QTY} × {placeholders.PANEL_WATT} ({placeholders.PANEL_MAKE})</text>
      </g>

      <FooterBar placeholders={placeholders} />
    </svg>
  </div>
);

/**
 * PAGE 3: ABOUT US & VISION, MISSION
 */
export const AboutUsPage = ({ placeholders }) => (
  <div data-quotation-page="true" className="w-[794px] h-[1123px] bg-white relative shadow-lg overflow-hidden flex-shrink-0">
    <svg viewBox="0 0 794 1123" className="w-full h-full">
      <HeaderBanner title="" placeholders={placeholders} />

      {/* Page Title Header */}
      <g transform="translate(80, 160)">
        <text x="0" y="30" fill="#053763" fontSize="26" fontWeight="bold" fontFamily="sans-serif">
          ABOUT US
        </text>
        <rect x="0" y="42" width="120" height="4" fill="#FFC700" />
      </g>

      {/* About Us Paragraph */}
      <g transform="translate(80, 230)">
        <rect x="0" y="0" width="634" height="170" fill="#F8FAFC" stroke="#053763" strokeWidth="1.5" rx="6" />
        <text x="30" y="45" fill="#000000" fontSize="15" fontFamily="sans-serif" fontWeight="bold">
          <tspan fill="#000000">At </tspan>
          <tspan fill="#053763" fontWeight="900">{placeholders.COMPANY_NAME}</tspan>
          <tspan fill="#000000">, we provide advanced UPS and solar power solutions</tspan>
          <tspan x="30" dy="28">tailored to meet your energy needs. Our focus is on delivering reliable, eco-friendly</tspan>
          <tspan x="30" dy="28">systems for homes and businesses, ensuring uninterrupted power and sustainable</tspan>
          <tspan x="30" dy="28">energy.</tspan>
        </text>
      </g>

      {/* Vision & Mission Header */}
      <g transform="translate(80, 440)">
        <text x="0" y="30" fill="#053763" fontSize="26" fontWeight="bold" fontFamily="sans-serif">
          VISION, MISSION
        </text>
        <rect x="0" y="42" width="180" height="4" fill="#FFC700" />
      </g>

      {/* Vision & Mission Paragraph */}
      <g transform="translate(80, 510)">
        <rect x="0" y="0" width="634" height="320" fill="#F8FAFC" stroke="#053763" strokeWidth="1.5" rx="6" />
        
        {/* Vision Section */}
        <text x="30" y="45" fill="#000000" fontSize="15" fontFamily="sans-serif" fontWeight="bold">
          <tspan fill="#053763" fontWeight="900" fontSize="16">Vision: </tspan>
          <tspan fill="#000000">To be a leading provider of sustainable energy solutions,</tspan>
          <tspan x="30" dy="28">empowering individuals and businesses with reliable, eco-friendly power</tspan>
          <tspan x="30" dy="28">systems that promote a greener future.</tspan>
        </text>

        {/* Mission Section */}
        <text x="30" y="160" fill="#000000" fontSize="15" fontFamily="sans-serif" fontWeight="bold">
          <tspan fill="#053763" fontWeight="900" fontSize="16">Mission: </tspan>
          <tspan fill="#000000">At </tspan>
          <tspan fill="#053763" fontWeight="900">{placeholders.COMPANY_NAME}</tspan>
          <tspan fill="#000000">, our mission is to deliver innovative UPS and</tspan>
          <tspan x="30" dy="28">solar power solutions that ensure continuous, efficient energy while reducing</tspan>
          <tspan x="30" dy="28">environmental impact. We are committed to quality, customer satisfaction, and</tspan>
          <tspan x="30" dy="28">driving the adoption of renewable energy for a brighter tomorrow.</tspan>
        </text>
      </g>

      <FooterBar placeholders={placeholders} />
    </svg>
  </div>
);

/**
 * PAGE 4: OUR SERVICES
 */
export const ServicesPage = ({ placeholders }) => (
  <div data-quotation-page="true" className="w-[794px] h-[1123px] bg-white relative shadow-lg overflow-hidden flex-shrink-0">
    <svg viewBox="0 0 794 1123" className="w-full h-full">
      <HeaderBanner title="" placeholders={placeholders} />

      {/* Section Header */}
      <g transform="translate(80, 160)">
        <text x="0" y="30" fill="#053763" fontSize="26" fontWeight="bold" fontFamily="sans-serif">
          OUR SERVICES
        </text>
        <rect x="0" y="42" width="140" height="4" fill="#FFC700" />
      </g>

      {/* Service Grid Cards */}
      <g transform="translate(80, 240)">
        {/* Service 1 */}
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="300" height="180" fill="#F0F9FF" stroke="#053763" strokeWidth="1.5" rx="6" />
          <circle cx="45" cy="45" r="24" fill="#053763" />
          <text x="45" y="52" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">1</text>
          <text x="85" y="40" fill="#053763" fontSize="16" fontWeight="bold">Residential &amp; Commercial</text>
          <text x="85" y="58" fill="#053763" fontSize="16" fontWeight="bold">Rooftop Solar</text>
          <text x="20" y="95" fill="#000000" fontSize="13" fontFamily="sans-serif" fontWeight="bold">
            <tspan x="20" dy="0">Reduce your electricity bills and</tspan>
            <tspan x="20" dy="20">environmental impact with our</tspan>
            <tspan x="20" dy="20">custom-designed rooftop solar systems.</tspan>
          </text>
        </g>

        {/* Service 2 */}
        <g transform="translate(334, 0)">
          <rect x="0" y="0" width="300" height="180" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" rx="6" />
          <circle cx="45" cy="45" r="24" fill="#D97706" />
          <text x="45" y="52" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">2</text>
          <text x="85" y="48" fill="#B45309" fontSize="16" fontWeight="bold">Free Consultation</text>
          <text x="20" y="95" fill="#000000" fontSize="13" fontFamily="sans-serif" fontWeight="bold">
            <tspan x="20" dy="0">Contact {placeholders.COMPANY_NAME} today</tspan>
            <tspan x="20" dy="20">and unlock the power of the sun with</tspan>
            <tspan x="20" dy="20">our expert site analysis.</tspan>
          </text>
        </g>

        {/* Service 3 */}
        <g transform="translate(0, 210)">
          <rect x="0" y="0" width="300" height="180" fill="#F0FDF4" stroke="#166534" strokeWidth="1.5" rx="6" />
          <circle cx="45" cy="45" r="24" fill="#166534" />
          <text x="45" y="52" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">3</text>
          <text x="85" y="40" fill="#166534" fontSize="16" fontWeight="bold">Expert Operation &amp;</text>
          <text x="85" y="58" fill="#166534" fontSize="16" fontWeight="bold">Maintenance</text>
          <text x="20" y="95" fill="#000000" fontSize="13" fontFamily="sans-serif" fontWeight="bold">
            <tspan x="20" dy="0">Ensure optimal generation and long life</tspan>
            <tspan x="20" dy="20">with our comprehensive annual care</tspan>
            <tspan x="20" dy="20">plans and testing.</tspan>
          </text>
        </g>

        {/* Service 4 */}
        <g transform="translate(334, 210)">
          <rect x="0" y="0" width="300" height="180" fill="#F5F3FF" stroke="#6D28D9" strokeWidth="1.5" rx="6" />
          <circle cx="45" cy="45" r="24" fill="#6D28D9" />
          <text x="45" y="52" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">4</text>
          <text x="85" y="48" fill="#6D28D9" fontSize="16" fontWeight="bold">Ground Mount Parks</text>
          <text x="20" y="95" fill="#000000" fontSize="13" fontFamily="sans-serif" fontWeight="bold">
            <tspan x="20" dy="0">Looking for large-scale clean energy</tspan>
            <tspan x="20" dy="20">generation? We design and build</tspan>
            <tspan x="20" dy="20">utility-grade solar parks.</tspan>
          </text>
        </g>
      </g>

      <FooterBar placeholders={placeholders} />
    </svg>
  </div>
);

/**
 * PAGE 5: BILL OF MATERIALS (PART 1)
 */
export const BOMPage1 = ({ placeholders }) => (
  <div data-quotation-page="true" className="w-[794px] h-[1123px] bg-white relative shadow-lg overflow-hidden flex-shrink-0">
    <svg viewBox="0 0 794 1123" className="w-full h-full">
      <HeaderBanner title="" placeholders={placeholders} />

      {/* Page Section Title */}
      <g transform="translate(397, 175)" textAnchor="middle">
        <text x="0" y="0" fill="#053763" fontSize="28" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">
          BILL OF MATERIALS
        </text>
      </g>

      {/* Table Container */}
      <g transform="translate(50, 210)">
        {/* Table Border Grid */}
        <rect x="0" y="0" width="694" height="800" fill="none" stroke="#000000" strokeWidth="1.5" />
        
        {/* Header Row */}
        <rect x="0" y="0" width="694" height="50" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
        <line x1="70" y1="0" x2="70" y2="800" stroke="#000000" strokeWidth="1.5" />
        <line x1="380" y1="0" x2="380" y2="800" stroke="#000000" strokeWidth="1.5" />
        <line x1="570" y1="0" x2="570" y2="800" stroke="#000000" strokeWidth="1.5" />

        {/* Header Titles */}
        <text x="35" y="32" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle">S.NO</text>
        <text x="225" y="32" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle">Description</text>
        <text x="475" y="32" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle">Make</text>
        <text x="632" y="32" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle">Quantity</text>

        {/* Horizontal Row Divider Lines */}
        <line x1="0" y1="200" x2="694" y2="200" stroke="#000000" strokeWidth="1.5" />
        <line x1="0" y1="340" x2="694" y2="340" stroke="#000000" strokeWidth="1.5" />
        <line x1="0" y1="450" x2="694" y2="450" stroke="#000000" strokeWidth="1.5" />
        <line x1="0" y1="560" x2="694" y2="560" stroke="#000000" strokeWidth="1.5" />
        <line x1="0" y1="680" x2="694" y2="680" stroke="#000000" strokeWidth="1.5" />

        {/* Row 1: Solar PV Panels */}
        <g transform="translate(0, 50)">
          <text x="35" y="75" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">1.</text>
          <text x="85" y="40" fill="#000000" fontSize="16" fontWeight="bold">Solar PV Panels</text>
          <text x="85" y="68" fill="#000000" fontSize="15" fontWeight="bold">Type – Mono Perc By Facial</text>
          <text x="85" y="93" fill="#000000" fontSize="15" fontWeight="bold">Topcon {placeholders.PANEL_WATT} or</text>
          <text x="85" y="118" fill="#000000" fontSize="15" fontWeight="bold">Equivalent</text>

          <text x="475" y="75" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">{placeholders.PANEL_MAKE}</text>
          <text x="632" y="75" fill="#000000" fontSize="17" fontWeight="bold" textAnchor="middle">{placeholders.PANEL_QTY}</text>
        </g>

        {/* Row 2: Inverter */}
        <g transform="translate(0, 200)">
          <text x="35" y="70" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">2.</text>
          <text x="85" y="52" fill="#000000" fontSize="16" fontWeight="bold">On Grid Inverter</text>
          <text x="85" y="82" fill="#000000" fontSize="15" fontWeight="bold">Capacity – {placeholders.INVERTER_KW} – {placeholders.INVERTER_PHASE}</text>

          <text x="475" y="70" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">{placeholders.INVERTER_MAKE}</text>
          <text x="632" y="70" fill="#000000" fontSize="17" fontWeight="bold" textAnchor="middle">1 No</text>
        </g>

        {/* Row 3: Structure */}
        <g transform="translate(0, 340)">
          <text x="35" y="60" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">3.</text>
          <text x="85" y="60" fill="#000000" fontSize="16" fontWeight="bold">Module Mounting Structure – GI</text>
          <text x="475" y="60" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">Own</text>
          <text x="632" y="60" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">As Req</text>
        </g>

        {/* Row 4: DC Cable */}
        <g transform="translate(0, 450)">
          <text x="35" y="60" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">4.</text>
          <text x="85" y="60" fill="#000000" fontSize="16" fontWeight="bold">DC Cable – 4 Sq.mm Copper</text>
          <text x="475" y="60" fill="#000000" fontSize="15" fontWeight="bold" textAnchor="middle">Poly Cab/ Equivalent</text>
          <text x="632" y="60" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">As Req</text>
        </g>

        {/* Row 5: AC Cable */}
        <g transform="translate(0, 560)">
          <text x="35" y="60" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">5.</text>
          <text x="85" y="45" fill="#000000" fontSize="16" fontWeight="bold">Ac Cable</text>
          <text x="85" y="75" fill="#000000" fontSize="16" fontWeight="bold">4 Sq MM Copper</text>
          <text x="475" y="60" fill="#000000" fontSize="15" fontWeight="bold" textAnchor="middle">Poly Cab/ Equivalent</text>
          <text x="632" y="60" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">As Req</text>
        </g>

        {/* Row 6: PVC Pipes */}
        <g transform="translate(0, 680)">
          <text x="35" y="60" fill="#000000" fontSize="22" fontWeight="bold" textAnchor="middle">6.</text>
          <text x="85" y="60" fill="#000000" fontSize="16" fontWeight="bold">PVC Pipes – 2 MM</text>
          <text x="475" y="60" fill="#000000" fontSize="15" fontWeight="bold" textAnchor="middle">Vasavi/Equivalent</text>
          <text x="632" y="60" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">As Req</text>
        </g>
      </g>

      <FooterBar placeholders={placeholders} />
    </svg>
  </div>
);

/**
 * PAGE 6: BILL OF MATERIALS (PART 2) & QUOTATION AMOUNT TABLE
 */
export const BOMPage2AndAmount = ({ placeholders }) => (
  <div data-quotation-page="true" className="w-[794px] h-[1123px] bg-white relative shadow-lg overflow-hidden flex-shrink-0">
    <svg viewBox="0 0 794 1123" className="w-full h-full">
      {/* Top Header Title */}
      <g transform="translate(397, 60)" textAnchor="middle">
        <text x="0" y="0" fill="#053763" fontSize="28" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">
          BILL OF MATERIALS
        </text>
      </g>

      {/* BOM Table Part 2 */}
      <g transform="translate(50, 90)">
        <rect x="0" y="0" width="694" height="420" fill="none" stroke="#000000" strokeWidth="1.5" />
        
        {/* Header Row */}
        <rect x="0" y="0" width="694" height="45" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
        <line x1="70" y1="0" x2="70" y2="420" stroke="#000000" strokeWidth="1.5" />
        <line x1="380" y1="0" x2="380" y2="420" stroke="#000000" strokeWidth="1.5" />
        <line x1="570" y1="0" x2="570" y2="420" stroke="#000000" strokeWidth="1.5" />

        <text x="35" y="28" fill="#000000" fontSize="17" fontWeight="bold" textAnchor="middle">S.NO</text>
        <text x="225" y="28" fill="#000000" fontSize="17" fontWeight="bold" textAnchor="middle">Description</text>
        <text x="475" y="28" fill="#000000" fontSize="17" fontWeight="bold" textAnchor="middle">Make</text>
        <text x="632" y="28" fill="#000000" fontSize="17" fontWeight="bold" textAnchor="middle">Quantity</text>

        {/* Row dividers */}
        <line x1="0" y1="120" x2="694" y2="120" stroke="#000000" strokeWidth="1.5" />
        <line x1="0" y1="195" x2="694" y2="195" stroke="#000000" strokeWidth="1.5" />
        <line x1="0" y1="270" x2="694" y2="270" stroke="#000000" strokeWidth="1.5" />
        <line x1="0" y1="345" x2="694" y2="345" stroke="#000000" strokeWidth="1.5" />

        {/* Row 7: Junction Boxes */}
        <g transform="translate(0, 45)">
          <text x="35" y="42" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle">7.</text>
          <text x="85" y="24" fill="#000000" fontSize="15" fontWeight="bold">Junction Boxes</text>
          <text x="85" y="45" fill="#000000" fontSize="14" fontWeight="bold">ACDB -1 Ph -1 In -1 Out</text>
          <text x="85" y="65" fill="#000000" fontSize="14" fontWeight="bold">DCDB -1 IN -1 O/P</text>

          <text x="475" y="42" fill="#000000" fontSize="15" fontWeight="bold" textAnchor="middle">{placeholders.INVERTER_MAKE}</text>
          <text x="632" y="42" fill="#000000" fontSize="15" fontWeight="bold" textAnchor="middle">Each 1 No</text>
        </g>

        {/* Row 8: Earthing */}
        <g transform="translate(0, 120)">
          <text x="35" y="42" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle">8.</text>
          <text x="85" y="42" fill="#000000" fontSize="16" fontWeight="bold">Earthing</text>
          <text x="475" y="42" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">In Finty</text>
          <text x="632" y="42" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">3 Nos</text>
        </g>

        {/* Row 9: Chemicals */}
        <g transform="translate(0, 195)">
          <text x="35" y="42" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle">9.</text>
          <text x="85" y="42" fill="#000000" fontSize="16" fontWeight="bold">Chemicals</text>
          <text x="475" y="42" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">In Finty</text>
          <text x="632" y="42" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">As Req</text>
        </g>

        {/* Row 10: Lighting Arrestor */}
        <g transform="translate(0, 270)">
          <text x="35" y="42" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle">10.</text>
          <text x="85" y="42" fill="#000000" fontSize="16" fontWeight="bold">Lighting Arrestor</text>
          <text x="475" y="42" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">Reputed Make</text>
          <text x="632" y="42" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">1 No</text>
        </g>

        {/* Row 11: Others BOS */}
        <g transform="translate(0, 345)">
          <text x="35" y="42" fill="#000000" fontSize="18" fontWeight="bold" textAnchor="middle">11.</text>
          <text x="85" y="42" fill="#000000" fontSize="16" fontWeight="bold">Others BOS Materials</text>
          <text x="475" y="42" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">Reputed make</text>
          <text x="632" y="42" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">As Req</text>
        </g>
      </g>

      {/* DYNAMIC AMOUNT TABLE SECTION */}
      <g transform="translate(50, 550)">
        <rect x="0" y="0" width="694" height="260" fill="none" stroke="#000000" strokeWidth="1.5" />
        
        {/* Table Column Lines */}
        <line x1="60" y1="0" x2="60" y2="260" stroke="#000000" strokeWidth="1.5" />
        <line x1="440" y1="0" x2="440" y2="260" stroke="#000000" strokeWidth="1.5" />

        {/* Row Dividers */}
        <line x1="0" y1="45" x2="694" y2="45" stroke="#000000" strokeWidth="1.5" />
        <line x1="0" y1="125" x2="694" y2="125" stroke="#000000" strokeWidth="1.5" />
        <line x1="0" y1="170" x2="694" y2="170" stroke="#000000" strokeWidth="1.5" />
        <line x1="0" y1="215" x2="694" y2="215" stroke="#000000" strokeWidth="1.5" />

        {/* Header */}
        <text x="30" y="28" fill="#000000" fontSize="17" fontWeight="bold" textAnchor="middle">S.No</text>
        <text x="250" y="28" fill="#000000" fontSize="17" fontWeight="bold" textAnchor="middle">Description</text>
        <text x="567" y="28" fill="#000000" fontSize="17" fontWeight="bold" textAnchor="middle">Amount</text>

        {/* Row 1: System Installation */}
        <g transform="translate(0, 45)">
          <text x="30" y="45" fill="#000000" fontSize="17" fontWeight="bold" textAnchor="middle">1.</text>
          <text x="80" y="32" fill="#000000" fontSize="16" fontWeight="bold">Supply , Installation, Testing &amp;</text>
          <text x="80" y="56" fill="#000000" fontSize="16" fontWeight="bold">Commissioning Of {placeholders.KW} Solar</text>
          <text x="80" y="76" fill="#000000" fontSize="16" fontWeight="bold">Power Plant Systems</text>

          <text x="670" y="48" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="end">{placeholders.SYSTEM_AMOUNT}</text>
        </g>

        {/* Row 2: GST */}
        <g transform="translate(0, 125)">
          <text x="30" y="30" fill="#000000" fontSize="17" fontWeight="bold" textAnchor="middle">2.</text>
          <text x="250" y="30" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">Gst {placeholders.GST_PERCENT_NUM} %</text>
          <text x="670" y="30" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="end">{placeholders.GST_AMOUNT}</text>
        </g>

        {/* Row 3: Subsidy */}
        <g transform="translate(0, 170)">
          <text x="30" y="30" fill="#000000" fontSize="17" fontWeight="bold" textAnchor="middle">3.</text>
          <text x="250" y="30" fill="#000000" fontSize="16" fontWeight="bold" textAnchor="middle">Less Subsidy</text>
          <text x="670" y="30" fill="#000000" fontSize="17" fontWeight="900" textAnchor="end">{placeholders.SUBSIDY}</text>
        </g>

        {/* Row 4: Total Amount */}
        <g transform="translate(0, 215)">
          <text x="250" y="30" fill="#000000" fontSize="18" fontWeight="900" textAnchor="middle">Total Amount</text>
          <text x="670" y="30" fill="#053763" fontSize="18" fontWeight="900" textAnchor="end">{placeholders.TOTAL_AMOUNT}</text>
        </g>
      </g>

      {/* AMOUNT IN WORDS */}
      <g transform="translate(50, 830)">
        <rect x="0" y="0" width="694" height="60" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" rx="4" />
        <text x="20" y="36" fill="#000000" fontSize="15" fontFamily="sans-serif" fontWeight="bold">
          <tspan fill="#000000" fontWeight="bold">In Words : </tspan>
          <tspan fill="#053763" fontWeight="900">{placeholders.TOTAL_IN_WORDS}</tspan>
        </text>
      </g>

      <FooterBar placeholders={placeholders} />
    </svg>
  </div>
);

/**
 * PAGE 7: TERMS & CONDITIONS
 */
export const TermsPage = ({ placeholders }) => (
  <div data-quotation-page="true" className="w-[794px] h-[1123px] bg-white relative shadow-lg overflow-hidden flex-shrink-0">
    <svg viewBox="0 0 794 1123" className="w-full h-full">
      <HeaderBanner title="" placeholders={placeholders} />

      {/* Section Title */}
      <g transform="translate(397, 180)" textAnchor="middle">
        <rect x="-180" y="-22" width="360" height="44" fill="#ffffff" stroke="#053763" strokeWidth="2" rx="4" />
        <text x="0" y="8" fill="#053763" fontSize="22" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">
          TERMS &amp; CONDITIONS
        </text>
      </g>

      {/* Terms Table */}
      <g transform="translate(50, 240)">
        <rect x="0" y="0" width="694" height="520" fill="#053763" />
        
        <line x1="80" y1="0" x2="80" y2="520" stroke="#ffffff" strokeWidth="1.5" />

        {/* Dividers */}
        <line x1="0" y1="80" x2="694" y2="80" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="0" y1="160" x2="694" y2="160" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="0" y1="240" x2="694" y2="240" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="0" y1="320" x2="694" y2="320" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="0" y1="410" x2="694" y2="410" stroke="#ffffff" strokeWidth="1.5" />

        {/* Item 1 */}
        <g transform="translate(0, 0)">
          <text x="40" y="48" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">1.</text>
          <text x="100" y="36" fill="#ffffff" fontSize="16" fontWeight="500">Delivery and Installation will be made within 15 days from the</text>
          <text x="100" y="60" fill="#ffffff" fontSize="16" fontWeight="500">date of PO</text>
        </g>

        {/* Item 2 */}
        <g transform="translate(0, 80)">
          <text x="40" y="48" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">2.</text>
          <text x="100" y="36" fill="#ffffff" fontSize="16" fontWeight="500">80% Payment as advance along with order confirmation Balance</text>
          <text x="100" y="60" fill="#ffffff" fontSize="16" fontWeight="500">After Installation</text>
        </g>

        {/* Item 3 */}
        <g transform="translate(0, 160)">
          <text x="40" y="48" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">3.</text>
          <text x="100" y="36" fill="#ffffff" fontSize="16" fontWeight="500">10 years warranty for inverter , 12+18 ; 30 years warranty for</text>
          <text x="100" y="60" fill="#ffffff" fontSize="16" fontWeight="500">solar panel ,</text>
        </g>

        {/* Item 4 */}
        <g transform="translate(0, 240)">
          <text x="40" y="48" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">4.</text>
          <text x="100" y="36" fill="#ffffff" fontSize="16" fontWeight="500">The Above Price is inclusive of GST {placeholders.GST_PERCENT_NUM} % Chargeable by the</text>
          <text x="100" y="60" fill="#ffffff" fontSize="16" fontWeight="500">Government</text>
        </g>

        {/* Item 5 */}
        <g transform="translate(0, 320)">
          <text x="40" y="52" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">5.</text>
          <text x="100" y="40" fill="#ffffff" fontSize="16" fontWeight="500">Any Structural modification, civil work based on the site</text>
          <text x="100" y="64" fill="#ffffff" fontSize="16" fontWeight="500">conditions shall be payable extra.</text>
        </g>

        {/* Item 6 */}
        <g transform="translate(0, 410)">
          <text x="40" y="55" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">6.</text>
          <text x="100" y="42" fill="#ffffff" fontSize="16" fontWeight="500">All Payments should be made by Cheque/DD/NEFT/RTGS in</text>
          <text x="100" y="66" fill="#ffffff" fontSize="16" fontWeight="500">Favor of</text>
          <text x="210" y="90" fill="#FFC700" fontSize="18" fontWeight="bold">{placeholders.COMPANY_NAME}</text>
        </g>
      </g>

      {/* SIGNATURE SECTION - Updated per user instruction: "FOR SK POWERTECH, Authorized Signatory no need" */}
      <g transform="translate(480, 840)">
        <text x="0" y="0" fill="#053763" fontSize="18" fontWeight="bold">FOR {placeholders.COMPANY_NAME},</text>
      </g>

      <FooterBar placeholders={placeholders} />
    </svg>
  </div>
);

/**
 * PAGE 8: WHY CHOOSE US & THANK YOU
 */
export const WhyChooseUsPage = ({ placeholders }) => (
  <div data-quotation-page="true" className="w-[794px] h-[1123px] bg-white relative shadow-lg overflow-hidden flex-shrink-0">
    <svg viewBox="0 0 794 1123" className="w-full h-full">
      <HeaderBanner title="" placeholders={placeholders} />

      {/* Title */}
      <g transform="translate(80, 160)">
        <text x="0" y="30" fill="#053763" fontSize="26" fontWeight="bold" fontFamily="sans-serif">
          WHY CHOOSE US
        </text>
        <rect x="0" y="42" width="160" height="4" fill="#FFC700" />
      </g>

      {/* Content Box */}
      <g transform="translate(80, 240)">
        <rect x="0" y="0" width="634" height="280" fill="#F8FAFC" stroke="#053763" strokeWidth="1.5" rx="8" />
        <text x="28" y="45" fill="#000000" fontSize="15" fontFamily="sans-serif" fontWeight="bold">
          <tspan fill="#000000">At </tspan>
          <tspan fill="#053763" fontWeight="900">{placeholders.COMPANY_NAME}</tspan>
          <tspan fill="#000000">, we offer tailored energy solutions that prioritize reliability,</tspan>
          <tspan x="28" dy="26">sustainability, and innovation.</tspan>

          <tspan x="28" dy="38" fill="#000000">With our advanced UPS and solar power systems, you can count on</tspan>
          <tspan x="28" dy="26">uninterrupted power and reduced energy costs.</tspan>

          <tspan x="28" dy="38" fill="#000000">We are committed to delivering top-quality products and exceptional customer</tspan>
          <tspan x="28" dy="26">service, ensuring your energy needs are met with efficiency and expertise.</tspan>

          <tspan x="28" dy="38" fill="#053763" fontWeight="900">Choose us for cutting-edge technology, eco-friendly solutions, and a dedicated team.</tspan>
        </text>
      </g>

      {/* Thank You Card */}
      <g transform="translate(80, 570)">
        <rect x="0" y="0" width="634" height="220" fill="#053763" rx="8" />
        <text x="317" y="55" fill="#FFC700" fontSize="32" fontWeight="900" textAnchor="middle" letterSpacing="1">
          THANK YOU
        </text>
        <text x="317" y="115" fill="#ffffff" fontSize="17" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
          <tspan x="317" dy="0">Thank you for choosing </tspan>
          <tspan fill="#FFC700" fontWeight="900">{placeholders.COMPANY_NAME}</tspan>
          <tspan fill="#ffffff">. We appreciate your trust</tspan>
          <tspan x="317" dy="28">and are committed to providing you with the best energy solutions.</tspan>
        </text>
      </g>

      {/* Contact Details Card - Dynamic Address & Phone */}
      <g transform="translate(80, 830)">
        <rect x="0" y="0" width="634" height="180" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" rx="8" />
        <text x="40" y="45" fill="#B45309" fontSize="18" fontWeight="bold">CONTACT DETAILS</text>
        
        <text x="40" y="85" fill="#000000" fontSize="15" fontWeight="bold">Contact No:</text>
        <text x="150" y="85" fill="#000000" fontSize="15" fontWeight="bold">{placeholders.MOBILE_NO}</text>

        <text x="40" y="125" fill="#000000" fontSize="15" fontWeight="bold">Address:</text>
        <text x="150" y="125" fill="#000000" fontSize="14" fontWeight="bold">{placeholders.ADDRESS}</text>
      </g>

      <FooterBar placeholders={placeholders} />
    </svg>
  </div>
);

/**
 * Main SVG Quotation Template Component rendering all pages sequentially
 */
export default function SVGTemplate({ placeholders }) {
  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <CoverPage placeholders={placeholders} />
      <ClientInfoPage placeholders={placeholders} />
      <AboutUsPage placeholders={placeholders} />
      <ServicesPage placeholders={placeholders} />
      <BOMPage1 placeholders={placeholders} />
      <BOMPage2AndAmount placeholders={placeholders} />
      <TermsPage placeholders={placeholders} />
      <WhyChooseUsPage placeholders={placeholders} />
    </div>
  );
}
