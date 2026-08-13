
// // utils/invoicePDF.js
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// // Helper function to format currency (BDT)
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-BD', {
//     style: 'currency',
//     currency: 'BDT',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   }).format(price || 0);
// };

// // Helper function to format date
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-BD', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// // ========== GET COLOR HEX - SUPPORTS BOTH HEX AND COLOR NAMES ==========
// const getColorHex = (color) => {
//   if (!color) return '#CCCCCC';
  
//   // If it already starts with #, it's a hex code - use it directly
//   if (color.startsWith('#')) {
//     return color;
//   }
  
//   // If it's a color name, convert to hex
//   const colorMap = {
//     'red': '#FF0000',
//     'blue': '#0000FF',
//     'green': '#00FF00',
//     'yellow': '#FFFF00',
//     'black': '#000000',
//     'white': '#FFFFFF',
//     'gray': '#808080',
//     'grey': '#808080',
//     'orange': '#FFA500',
//     'purple': '#800080',
//     'pink': '#FFC0CB',
//     'brown': '#A52A2A',
//     'cyan': '#00FFFF',
//     'magenta': '#FF00FF',
//     'lime': '#00FF00',
//     'maroon': '#800000',
//     'navy': '#000080',
//     'olive': '#808000',
//     'teal': '#008080',
//     'silver': '#C0C0C0',
//     'gold': '#FFD700',
//     'coral': '#FF7F50',
//     'crimson': '#DC143C',
//     'indigo': '#4B0082',
//     'lavender': '#E6E6FA',
//     'salmon': '#FA8072',
//     'tan': '#D2B48C',
//     'violet': '#EE82EE',
//     'turquoise': '#40E0D0',
//     'beige': '#F5F5DC',
//     'chocolate': '#D2691E',
//     'fuchsia': '#FF00FF',
//     'ivory': '#FFFFF0',
//     'khaki': '#F0E68C',
//     'moccasin': '#FFE4B5',
//     'orchid': '#DA70D6',
//     'peach': '#FFDAB9',
//     'plum': '#DDA0DD',
//     'rose': '#FF007F',
//     'ruby': '#E0115F',
//     'sapphire': '#0F52BA',
//     'scarlet': '#FF2400',
//     'sky blue': '#87CEEB',
//     'skyblue': '#87CEEB',
//     'spring green': '#00FF7F',
//     'springgreen': '#00FF7F',
//     'steel blue': '#4682B4',
//     'steelblue': '#4682B4',
//     'tomato': '#FF6347',
//     'wheat': '#F5DEB3',
//     'midnight blue': '#191970',
//     'midnightblue': '#191970',
//     'dark blue': '#00008B',
//     'darkblue': '#00008B',
//     'dark green': '#006400',
//     'darkgreen': '#006400',
//     'dark red': '#8B0000',
//     'darkred': '#8B0000',
//     'dark gray': '#A9A9A9',
//     'darkgray': '#A9A9A9',
//     'light blue': '#ADD8E6',
//     'lightblue': '#ADD8E6',
//     'light green': '#90EE90',
//     'lightgreen': '#90EE90',
//     'light gray': '#D3D3D3',
//     'lightgray': '#D3D3D3',
//     'light pink': '#FFB6C1',
//     'lightpink': '#FFB6C1',
//     'dark pink': '#FF1493',
//     'darkpink': '#FF1493',
//   };
  
//   const lowerColor = color.toLowerCase().trim();
//   if (colorMap[lowerColor]) {
//     return colorMap[lowerColor];
//   }
  
//   // Try partial match
//   for (const [key, value] of Object.entries(colorMap)) {
//     if (lowerColor.includes(key) || key.includes(lowerColor)) {
//       return value;
//     }
//   }
  
//   return '#CCCCCC';
// };

// // ========== DRAW COLOR SWATCH IN PDF ==========
// const drawColorSwatch = (doc, x, y, color, size = 4) => {
//   const hexColor = getColorHex(color);
  
//   let r = 200, g = 200, b = 200;
//   if (hexColor.startsWith('#')) {
//     const hex = hexColor.substring(1);
//     if (hex.length === 3) {
//       r = parseInt(hex[0] + hex[0], 16);
//       g = parseInt(hex[1] + hex[1], 16);
//       b = parseInt(hex[2] + hex[2], 16);
//     } else if (hex.length === 6) {
//       r = parseInt(hex.substring(0, 2), 16);
//       g = parseInt(hex.substring(2, 4), 16);
//       b = parseInt(hex.substring(4, 6), 16);
//     }
//   }
  
//   // Draw filled circle for color
//   doc.setFillColor(r, g, b);
//   doc.circle(x + size/2, y + size/2, size/2, 'F');
  
//   // Draw border
//   doc.setDrawColor(200, 200, 200);
//   doc.circle(x + size/2, y + size/2, size/2, 'S');
// };

// // ========== FETCH NAVBAR DATA FOR LOGO ==========
// const fetchNavbarData = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const headers = {};
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     }
    
//     // Add cache-busting to API call
//     const cacheBuster = `?t=${Date.now()}`;
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/navbar${cacheBuster}`, { 
//       headers,
//       cache: 'no-store'
//     });
//     const data = await response.json();
    
//     if (data.success && data.data && data.data.logo) {
//       return data.data.logo;
//     }
//     return null;
//   } catch (error) {
//     console.error('Error fetching navbar logo:', error);
//     return null;
//   }
// };

// // ========== CONVERT IMAGE TO BASE64 ==========
// const imageToBase64 = async (imageUrl) => {
//   try {
//     if (imageUrl?.startsWith('data:image')) {
//       return imageUrl;
//     }
//     if (!imageUrl) return null;
    
//     // Handle relative URLs
//     let fullUrl = imageUrl;
//     if (imageUrl.startsWith('/')) {
//       fullUrl = `${window.location.origin}${imageUrl}`;
//     }
    
//     // Add cache-busting
//     const cacheBuster = `?t=${Date.now()}`;
//     const urlWithCacheBust = fullUrl.includes('?') 
//       ? `${fullUrl}&t=${Date.now()}` 
//       : `${fullUrl}${cacheBuster}`;
    
//     const response = await fetch(urlWithCacheBust, {
//       headers: {
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': '0'
//       }
//     });
    
//     if (!response.ok) {
//       console.warn(`Failed to fetch image: ${fullUrl}`);
//       return null;
//     }
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error('Error converting image to base64:', error);
//     return null;
//   }
// };

// // Helper to check if item has colors
// const hasColorsArray = (item) => {
//   return item.colors && item.colors.length > 0;
// };

// // Helper to get item price
// const getItemPrice = (item) => {
//   return item.discountPrice || item.regularPrice || 0;
// };

// // Get company initials for logo fallback
// const getCompanyInitials = (companyName) => {
//   if (!companyName) return 'HV';
//   return companyName
//     .split(' ')
//     .map(word => word[0])
//     .join('')
//     .toUpperCase()
//     .substring(0, 2);
// };

// // ========== HYPERVOLT THEME COLORS ==========
// const COLORS = {
//   primary: '#0D506F',      // Main HyperVolt blue
//   primaryLight: '#1A6B8F',
//   primaryDark: '#0A3D55',
//   secondary: '#06B6D4',    // Cyan accent
//   black: '#000000',
//   white: '#FFFFFF',
//   lightGray: '#F0F7FA',
//   border: '#0D506F',
//   text: '#0D506F',
//   textLight: '#64748B',
//   textMuted: '#94A3B8',
//   paid: '#22C55E',
//   unpaid: '#EF4444',
//   partial: '#F59E0B'
// };

// export const generateInvoicePDF = async (order) => {
//   try {
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const margin = 15;
//     const contentWidth = pageWidth - (2 * margin);
//     let yPos = margin;

//     // ========== FETCH DYNAMIC LOGO FROM NAVBAR ==========
//     let companyLogoBase64 = null;
    
//     try {
//       const navbarLogo = await fetchNavbarData();
//       if (navbarLogo && navbarLogo.logoUrl) {
//         const result = await imageToBase64(navbarLogo.logoUrl);
//         if (result) {
//           companyLogoBase64 = result;
//           console.log('✅ Logo loaded from navbar successfully');
//         }
//       }
//     } catch (error) {
//       console.warn('Failed to load logo from navbar:', error);
//     }
    
//     // If no logo from navbar, try local paths
//     if (!companyLogoBase64) {
//       console.log('🔄 Trying local logo paths...');
//       try {
//         const logoPaths = [
//           '/logo.png',
//           '/images/logo.png',
//           '/images/logo2.png',
//           '/images/logo/logo.png'
//         ];
        
//         for (const path of logoPaths) {
//           try {
//             const result = await imageToBase64(path);
//             if (result) {
//               companyLogoBase64 = result;
//               console.log('✅ Logo loaded from local path:', path);
//               break;
//             }
//           } catch (e) {
//             // Continue to next path
//           }
//         }
//       } catch (error) {
//         console.warn('No local logo found');
//       }
//     }

//     // ==================== HEADER ====================
//     // HyperVolt header bar - Using #0D506F
//     doc.setFillColor(13, 80, 111);
//     doc.rect(0, 0, pageWidth, 32, 'F');
    
//     // White rounded rectangle for content
//     doc.setFillColor(COLORS.white);
//     doc.roundedRect(margin, yPos, contentWidth, 26, 2, 2, 'F');

//     const logoSize = 18;
//     const logoMaxWidth = 22;
//     const logoMaxHeight = 18;
//     const logoX = margin + 5;
//     const logoY = yPos + 4;

//     // Logo or initials
//     if (companyLogoBase64) {
//       try {
//         // Create image element to get dimensions
//         const img = new Image();
//         img.src = companyLogoBase64;
        
//         await new Promise((resolve) => {
//           img.onload = resolve;
//         });
        
//         let imgWidth = img.width;
//         let imgHeight = img.height;
//         let finalWidth = logoSize;
//         let finalHeight = logoSize;
        
//         const aspectRatio = imgWidth / imgHeight;
        
//         if (aspectRatio > 1) {
//           finalWidth = logoSize;
//           finalHeight = logoSize / aspectRatio;
//         } else {
//           finalHeight = logoSize;
//           finalWidth = logoSize * aspectRatio;
//         }
        
//         if (finalWidth > logoMaxWidth) {
//           finalWidth = logoMaxWidth;
//           finalHeight = finalWidth / aspectRatio;
//         }
//         if (finalHeight > logoMaxHeight) {
//           finalHeight = logoMaxHeight;
//           finalWidth = finalHeight * aspectRatio;
//         }
        
//         const offsetX = (logoSize - finalWidth) / 2;
//         const offsetY = (logoSize - finalHeight) / 2;
        
//         doc.addImage(companyLogoBase64, 'PNG', logoX + offsetX, logoY + offsetY, finalWidth, finalHeight);
//         console.log('✅ Logo added to PDF');
//       } catch (error) {
//         console.error('Error adding logo to PDF:', error);
//         // Fallback to initials
//         const initials = getCompanyInitials('HyperVolt');
//         doc.setFillColor(13, 80, 111);
//         doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
//         doc.setFontSize(9);
//         doc.setFont('helvetica', 'bold');
//         doc.setTextColor(COLORS.white);
//         doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
//       }
//     } else {
//       const initials = getCompanyInitials('HyperVolt');
//       doc.setFillColor(13, 80, 111);
//       doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
//       doc.setFontSize(9);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.white);
//       doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
//     }

//     const companyX = logoX + logoSize + 8;

//     // ========== HYPERVOLT COMPANY NAME - STATIC ==========
//     // "Hyper" in dark, "Volt" in cyan accent
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'bold');
    
//     // Draw "Hyper" in dark color
//     doc.setTextColor(13, 80, 111);
//     doc.text('Hyper', companyX, logoY + 4);
    
//     // Draw "Volt" in cyan accent
//     const hyperWidth = doc.getTextWidth('Hyper');
//     doc.setTextColor(6, 182, 212);
//     doc.text('Volt', companyX + hyperWidth, logoY + 4);

//     doc.setFontSize(7);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.textLight);
    
//     doc.setFont('helvetica', 'bold');
//     doc.text('Contact: ', companyX, logoY + 9);
//     const contactLabelWidth = doc.getTextWidth('Contact: ');
//     doc.setFont('helvetica', 'normal');
//     doc.text('+8801XXXXXXXXX', companyX + contactLabelWidth, logoY + 9);

//     doc.setFontSize(6.5);
//     doc.text('info@hypervolt.com', companyX, logoY + 13);

//     doc.setFontSize(6);
//     const companyAddressLines = doc.splitTextToSize('House #470, Avenue 6, Road 6, Mirpur DOHS, Dhaka', 70);
//     doc.text(companyAddressLines, companyX, logoY + 17);

//     const rightAlignX = pageWidth - margin - 5;
    
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     const invoiceNoText = `INVOICE NO: `;
//     const orderNumber = order.orderNumber || order._id.slice(-8).toUpperCase();
//     doc.text(invoiceNoText, rightAlignX - doc.getTextWidth(invoiceNoText + orderNumber), yPos + 8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.text);
//     doc.text(orderNumber, rightAlignX, yPos + 8, { align: 'right' });

//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.textLight);
    
//     const orderDate = formatDate(order.createdAt);
//     const status = order.orderStatus?.toUpperCase() || 'PLACED';
//     const paymentMethod = order.paymentMethod?.toUpperCase() || 'COD';
    
//     doc.text(`Date: ${orderDate}`, rightAlignX, yPos + 11.5, { align: 'right' });
    
//     let statusColor = COLORS.unpaid;
//     if (status === 'DELIVERED') statusColor = COLORS.paid;
//     else if (status === 'CANCELLED') statusColor = COLORS.unpaid;
//     doc.setTextColor(statusColor);
//     doc.text(`Status: ${status}`, rightAlignX, yPos + 15.5, { align: 'right' });
//     doc.setTextColor(COLORS.textLight);
    
//     doc.text(`Payment: ${paymentMethod}`, rightAlignX, yPos + 19.5, { align: 'right' });

//     // ==================== CUSTOMER & DELIVERY INFO SECTION ====================
//     yPos += 34;
    
//     // Customer Info (Left Column)
//     const customerColWidth = (contentWidth / 2) - 3;
//     const addressColWidth = (contentWidth / 2) - 3;
    
//     let leftColHeight = 25;
//     let rightColHeight = 25;
    
//     // Calculate heights for customer info
//     const customerInfoLines = [
//       `Name: ${order.customerInfo.fullName || 'N/A'}`,
//       order.customerInfo.email ? `Email: ${order.customerInfo.email}` : null,
//       `Phone: ${order.customerInfo.phone || 'N/A'}`,
//       `Address: ${order.customerInfo.address || 'N/A'}`
//     ].filter(Boolean);
//     leftColHeight = Math.max(leftColHeight, 10 + (customerInfoLines.length * 4.5));
    
//     // Calculate heights for delivery address
//     const deliveryAddressLines = [
//       order.customerInfo.area ? `Area/Union: ${order.customerInfo.area}` : null,
//       order.customerInfo.zone ? `Upazila/Thana: ${order.customerInfo.zone}` : null,
//       order.customerInfo.city ? `District/City: ${order.customerInfo.city}` : null,
//       order.customerInfo.division ? `Division: ${order.customerInfo.division}` : null,
//     ].filter(Boolean);
//     rightColHeight = Math.max(rightColHeight, 10 + (deliveryAddressLines.length * 4.5));
    
//     const colHeight = Math.max(leftColHeight, rightColHeight, 35);
    
//     // Left Column - Customer Info
//     doc.setFillColor(240, 247, 250);
//     doc.roundedRect(margin, yPos, customerColWidth, colHeight, 2, 2, 'F');
    
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('CUSTOMER INFO', margin + 5, yPos + 5);
    
//     let leftY = yPos + 10;
//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.text);
    
//     // Name
//     doc.setFont('helvetica', 'bold');
//     doc.text('Name:', margin + 5, leftY);
//     doc.setFont('helvetica', 'normal');
//     doc.text(order.customerInfo.fullName || 'N/A', margin + 30, leftY);
//     leftY += 4.5;
    
//     // Email (if exists)
//     if (order.customerInfo.email) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Email:', margin + 5, leftY);
//       doc.setFont('helvetica', 'normal');
//       doc.text(order.customerInfo.email, margin + 30, leftY);
//       leftY += 4.5;
//     }
    
//     // Phone
//     doc.setFont('helvetica', 'bold');
//     doc.text('Phone:', margin + 5, leftY);
//     doc.setFont('helvetica', 'normal');
//     doc.text(order.customerInfo.phone || 'N/A', margin + 30, leftY);
//     leftY += 4.5;
    
//     // Address
//     doc.setFont('helvetica', 'bold');
//     doc.text('Address:', margin + 5, leftY);
//     doc.setFont('helvetica', 'normal');
//     const addressValue = order.customerInfo.address || 'N/A';
//     const addressLines = doc.splitTextToSize(addressValue, customerColWidth - 35);
//     for (let i = 0; i < addressLines.length; i++) {
//       const xPos = i === 0 ? margin + 30 : margin + 5 + 5;
//       doc.text(addressLines[i], xPos, leftY + (i * 4));
//     }
    
//     // Right Column - Delivery Address
//     const addressColX = margin + customerColWidth + 6;
//     doc.setFillColor(240, 247, 250);
//     doc.roundedRect(addressColX, yPos, addressColWidth, colHeight, 2, 2, 'F');
    
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('DELIVERY ADDRESS', addressColX + 5, yPos + 5);
    
//     let rightY = yPos + 10;
//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.text);
    
//     // Area/Union
//     if (order.customerInfo.area) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Area/Union:', addressColX + 5, rightY);
//       doc.setFont('helvetica', 'normal');
//       doc.text(order.customerInfo.area, addressColX + 40, rightY);
//       rightY += 4.5;
//     }
    
//     // Upazila/Thana
//     if (order.customerInfo.zone) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Upazila/Thana:', addressColX + 5, rightY);
//       doc.setFont('helvetica', 'normal');
//       doc.text(order.customerInfo.zone, addressColX + 40, rightY);
//       rightY += 4.5;
//     }
    
//     // District/City
//     if (order.customerInfo.city) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('District/City:', addressColX + 5, rightY);
//       doc.setFont('helvetica', 'normal');
//       doc.text(order.customerInfo.city, addressColX + 40, rightY);
//       rightY += 4.5;
//     }
    
//     // Division
//     if (order.customerInfo.division) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Division:', addressColX + 5, rightY);
//       doc.setFont('helvetica', 'normal');
//       doc.text(order.customerInfo.division, addressColX + 40, rightY);
//       rightY += 4.5;
//     }
    
//     yPos += colHeight + 10;

//     // ==================== ITEMS TABLE WITH COLOR SWATCHES ====================
//     doc.setFontSize(9);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.text);
//     doc.text('ORDER ITEMS', margin, yPos);
//     yPos += 5;

//     // Table Column Positions
//     const colPositions = {
//       item: margin + 3,
//       product: margin + 10,
//       color: margin + contentWidth - 95,
//       qty: margin + contentWidth - 75,
//       price: margin + contentWidth - 50,
//       total: margin + contentWidth - 10
//     };

//     // Table Header - HyperVolt blue
//     doc.setFillColor(13, 80, 111);
//     doc.rect(margin, yPos, contentWidth, 7, 'F');

//     doc.setFontSize(7);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.white);

//     doc.text('#', colPositions.item, yPos + 4.5);
//     doc.text('Product', colPositions.product, yPos + 4.5);
//     doc.text('Color', colPositions.color, yPos + 4.5);
//     doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//     doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
//     doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });

//     yPos += 10;

//     let rowCount = 0;
//     const orderItems = order.items || [];
    
//     orderItems.forEach((item, index) => {
//       const price = getItemPrice(item);
//       const hasColors = hasColorsArray(item);
//       const isEven = rowCount % 2 === 0;
      
//       // Calculate total rows needed for this item
//       let totalRows = 1;
//       if (hasColors && item.colors.length > 0) {
//         totalRows = item.colors.length;
//       }
      
//       const rowHeight = 7;
      
//       // Check if we need a new page
//       if (yPos + (rowHeight * totalRows) > pageHeight - 55) {
//         doc.addPage();
//         yPos = margin + 10;
//         rowCount = 0;
        
//         // Re-draw header on new page
//         doc.setFillColor(13, 80, 111);
//         doc.rect(margin, yPos, contentWidth, 7, 'F');
//         doc.setFontSize(7);
//         doc.setFont('helvetica', 'bold');
//         doc.setTextColor(COLORS.white);
//         doc.text('#', colPositions.item, yPos + 4.5);
//         doc.text('Product', colPositions.product, yPos + 4.5);
//         doc.text('Color', colPositions.color, yPos + 4.5);
//         doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//         doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
//         doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
//         yPos += 10;
//       }

//       if (hasColors && item.colors.length > 0) {
//         // Multi-color product - show each color in separate row
//         item.colors.forEach((colorObj, colorIdx) => {
//           const isFirstRow = colorIdx === 0;
//           const colorTotal = price * colorObj.quantity;
          
//           // Row background - alternating gray
//           if (rowCount % 2 === 0) {
//             doc.setFillColor(240, 247, 250);
//             doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
//           }
          
//           doc.setFontSize(6.5);
//           doc.setFont('helvetica', 'normal');
//           doc.setTextColor(COLORS.text);
          
//           const textY = yPos + 4;
          
//           if (isFirstRow) {
//             // Item number
//             doc.text((index + 1).toString(), colPositions.item, textY);
            
//             // Product name
//             let productName = item.productName || '';
//             const maxWidth = 55;
//             while (doc.getTextWidth(productName) > maxWidth && productName.length > 3) {
//               productName = productName.substring(0, productName.length - 1);
//             }
//             if (productName !== (item.productName || '')) {
//               productName = productName.substring(0, productName.length - 3) + '...';
//             }
//             doc.text(productName, colPositions.product, textY);
//           }
          
//           // ========== DRAW COLOR SWATCH ==========
//           const colorX = colPositions.color;
//           const swatchSize = 4.5;
//           const swatchY = yPos + 1;
          
//           drawColorSwatch(doc, colorX, swatchY, colorObj.color, swatchSize);
          
//           // Quantity for this color
//           doc.text(colorObj.quantity.toString(), colPositions.qty, textY, { align: 'right' });
          
//           // Price per unit
//           doc.text(formatPrice(price), colPositions.price, textY, { align: 'right' });
          
//           // Total for this color
//           doc.setFont('helvetica', 'bold');
//           doc.setTextColor(COLORS.primary);
//           doc.text(formatPrice(colorTotal), colPositions.total, textY, { align: 'right' });
          
//           yPos += rowHeight;
//           rowCount++;
//         });
//       } else {
//         // Single item (with or without color)
//         const singleTotal = price * (item.quantity || 0);
//         const hasSingleColor = item.selectedColor && item.selectedColor !== null && item.selectedColor !== '';
        
//         // Row background - alternating gray
//         if (rowCount % 2 === 0) {
//           doc.setFillColor(240, 247, 250);
//           doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
//         }
        
//         doc.setFontSize(6.5);
//         doc.setFont('helvetica', 'normal');
//         doc.setTextColor(COLORS.text);
        
//         const textY = yPos + 4;
        
//         // Item number
//         doc.text((index + 1).toString(), colPositions.item, textY);
        
//         // Product name
//         let productName = item.productName || '';
//         const maxWidth = 55;
//         while (doc.getTextWidth(productName) > maxWidth && productName.length > 3) {
//           productName = productName.substring(0, productName.length - 1);
//         }
//         if (productName !== (item.productName || '')) {
//           productName = productName.substring(0, productName.length - 3) + '...';
//         }
//         doc.text(productName, colPositions.product, textY);
        
//         // ========== DRAW COLOR SWATCH OR DASH ==========
//         const colorX = colPositions.color;
//         if (hasSingleColor) {
//           const swatchSize = 4.5;
//           const swatchY = yPos + 1;
//           drawColorSwatch(doc, colorX, swatchY, item.selectedColor, swatchSize);
//         } else {
//           doc.setTextColor(COLORS.textMuted);
//           doc.text('—', colorX, textY);
//           doc.setTextColor(COLORS.text);
//         }
        
//         // Quantity
//         doc.text((item.quantity || 0).toString(), colPositions.qty, textY, { align: 'right' });
        
//         // Price per unit
//         doc.text(formatPrice(price), colPositions.price, textY, { align: 'right' });
        
//         // Total
//         doc.setFont('helvetica', 'bold');
//         doc.setTextColor(COLORS.primary);
//         doc.text(formatPrice(singleTotal), colPositions.total, textY, { align: 'right' });
        
//         yPos += rowHeight;
//         rowCount++;
//       }
//     });

//     yPos += 5;

//     // ==================== SUMMARY SECTION ====================
//     const summaryWidth = 85;
//     const summaryX = pageWidth - margin - summaryWidth;
    
//     doc.setFillColor(240, 247, 250);
//     doc.setDrawColor(COLORS.primary);
//     doc.setLineWidth(0.3);
//     doc.roundedRect(summaryX, yPos, summaryWidth, 45, 2, 2, 'FD');

//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('SUMMARY', summaryX + 3, yPos + 5);

//     let summaryY = yPos + 9;
//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.text);

//     const subtotal = order.subtotal || 0;
//     const shippingCost = order.shippingCost || 0;
//     const discount = order.discount || 0;
//     const total = order.total || 0;

//     doc.text('Subtotal:', summaryX + 3, summaryY);
//     doc.text(formatPrice(subtotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//     summaryY += 4.5;

//     doc.text('Shipping:', summaryX + 3, summaryY);
//     doc.text(formatPrice(shippingCost), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//     summaryY += 4.5;

//     if (discount > 0) {
//       doc.setTextColor(COLORS.paid);
//       doc.text('Discount:', summaryX + 3, summaryY);
//       doc.text(`-${formatPrice(discount)}`, summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//       doc.setTextColor(COLORS.text);
//       summaryY += 4.5;
//     }

//     doc.setDrawColor(COLORS.primary);
//     doc.setLineWidth(0.3);
//     doc.line(summaryX + 3, summaryY - 1, summaryX + summaryWidth - 3, summaryY - 1);
    
//     summaryY += 2;
    
//     doc.setFontSize(9);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('TOTAL:', summaryX + 3, summaryY);
//     doc.text(formatPrice(total), summaryX + summaryWidth - 3, summaryY, { align: 'right' });

//     yPos += 55;

//     // ==================== ORDER NOTES ====================
//     if (order.customerInfo?.note) {
//       if (yPos > pageHeight - 35) {
//         doc.addPage();
//         yPos = margin + 10;
//       }
      
//       doc.setDrawColor(COLORS.primary);
//       doc.setLineWidth(0.3);
//       doc.line(margin, yPos, pageWidth - margin, yPos);
//       yPos += 5;
      
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.primary);
//       doc.text('ORDER NOTES:', margin, yPos);
      
//       doc.setFontSize(6);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(COLORS.textLight);
      
//       const noteLines = doc.splitTextToSize(order.customerInfo.note, contentWidth);
//       doc.text(noteLines, margin, yPos + 4);
//       yPos += (noteLines.length * 4) + 10;
//     }

//     // ==================== FOOTER ====================
//     const footerY = pageHeight - 8;
    
//     doc.setDrawColor(COLORS.primary);
//     doc.setLineWidth(0.3);
//     doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);
    
//     doc.setFontSize(5.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.textMuted);
    
//     doc.text('Thank you for shopping with HyperVolt! ⚡', pageWidth / 2, footerY, { align: 'center' });
//     doc.text('For any queries, contact us at support@hypervolt.com', pageWidth / 2, footerY + 4, { align: 'center' });

//     // ==================== SAVE PDF ====================
//     const pdfBlob = doc.output('blob');
//     const url = URL.createObjectURL(pdfBlob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Invoice_${orderNumber}.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);

//     return { success: true, fileName: `Invoice_${orderNumber}.pdf` };
    
//   } catch (error) {
//     console.error('PDF Generation Error:', error);
//     throw error;
//   }
// };


// utils/invoicePDF.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Helper function to format currency (BDT)
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price || 0);
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// ========== SMART GADGET COLORS ==========
const COLORS = {
  primary: '#1E3A5F',        // Dark Navy Blue
  primaryLight: '#2D5A8E',   // Lighter Navy Blue  
  primaryDark: '#0F2440',    // Almost Black Navy
  secondary: '#2563EB',      // Blue-600
  accent: '#06B6D4',         // Cyan-600
  black: '#000000',
  white: '#FFFFFF',
  lightGray: '#F8FAFC',
  border: '#2563EB30',
  text: '#0F172A',
  textLight: '#64748B',
  textMuted: '#94A3B8',
  paid: '#22C55E',
  unpaid: '#EF4444',
  partial: '#F59E0B'
};

// ========== GET COLOR HEX - SUPPORTS BOTH HEX AND COLOR NAMES ==========
const getColorHex = (color) => {
  if (!color) return '#CCCCCC';
  
  if (color.startsWith('#')) {
    return color;
  }
  
  const colorMap = {
    'red': '#FF0000',
    'blue': '#0000FF',
    'green': '#00FF00',
    'yellow': '#FFFF00',
    'black': '#000000',
    'white': '#FFFFFF',
    'gray': '#808080',
    'grey': '#808080',
    'orange': '#FFA500',
    'purple': '#800080',
    'pink': '#FFC0CB',
    'brown': '#A52A2A',
    'cyan': '#00FFFF',
    'magenta': '#FF00FF',
    'lime': '#00FF00',
    'maroon': '#800000',
    'navy': '#000080',
    'olive': '#808000',
    'teal': '#008080',
    'silver': '#C0C0C0',
    'gold': '#FFD700',
    'coral': '#FF7F50',
    'crimson': '#DC143C',
    'indigo': '#4B0082',
    'lavender': '#E6E6FA',
    'salmon': '#FA8072',
    'tan': '#D2B48C',
    'violet': '#EE82EE',
    'turquoise': '#40E0D0',
    'beige': '#F5F5DC',
    'chocolate': '#D2691E',
    'fuchsia': '#FF00FF',
    'ivory': '#FFFFF0',
    'khaki': '#F0E68C',
    'moccasin': '#FFE4B5',
    'orchid': '#DA70D6',
    'peach': '#FFDAB9',
    'plum': '#DDA0DD',
    'rose': '#FF007F',
    'ruby': '#E0115F',
    'sapphire': '#0F52BA',
    'scarlet': '#FF2400',
    'sky blue': '#87CEEB',
    'skyblue': '#87CEEB',
    'spring green': '#00FF7F',
    'springgreen': '#00FF7F',
    'steel blue': '#4682B4',
    'steelblue': '#4682B4',
    'tomato': '#FF6347',
    'wheat': '#F5DEB3',
    'midnight blue': '#191970',
    'midnightblue': '#191970',
    'dark blue': '#00008B',
    'darkblue': '#00008B',
    'dark green': '#006400',
    'darkgreen': '#006400',
    'dark red': '#8B0000',
    'darkred': '#8B0000',
    'dark gray': '#A9A9A9',
    'darkgray': '#A9A9A9',
    'light blue': '#ADD8E6',
    'lightblue': '#ADD8E6',
    'light green': '#90EE90',
    'lightgreen': '#90EE90',
    'light gray': '#D3D3D3',
    'lightgray': '#D3D3D3',
    'light pink': '#FFB6C1',
    'lightpink': '#FFB6C1',
    'dark pink': '#FF1493',
    'darkpink': '#FF1493',
  };
  
  const lowerColor = color.toLowerCase().trim();
  if (colorMap[lowerColor]) {
    return colorMap[lowerColor];
  }
  
  for (const [key, value] of Object.entries(colorMap)) {
    if (lowerColor.includes(key) || key.includes(lowerColor)) {
      return value;
    }
  }
  
  return '#CCCCCC';
};

// ========== DRAW COLOR SWATCH IN PDF ==========
const drawColorSwatch = (doc, x, y, color, size = 4) => {
  const hexColor = getColorHex(color);
  
  let r = 200, g = 200, b = 200;
  if (hexColor.startsWith('#')) {
    const hex = hexColor.substring(1);
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  }
  
  doc.setFillColor(r, g, b);
  doc.circle(x + size/2, y + size/2, size/2, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.circle(x + size/2, y + size/2, size/2, 'S');
};

// ========== FETCH NAVBAR DATA FOR LOGO ==========
const fetchNavbarData = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const cacheBuster = `?t=${Date.now()}`;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/navbar${cacheBuster}`, { 
      headers,
      cache: 'no-store'
    });
    const data = await response.json();
    
    if (data.success && data.data && data.data.logo) {
      return data.data.logo;
    }
    return null;
  } catch (error) {
    console.error('Error fetching navbar logo:', error);
    return null;
  }
};

// ========== CONVERT IMAGE TO BASE64 ==========
const imageToBase64 = async (imageUrl) => {
  try {
    if (imageUrl?.startsWith('data:image')) {
      return imageUrl;
    }
    if (!imageUrl) return null;
    
    let fullUrl = imageUrl;
    if (imageUrl.startsWith('/')) {
      fullUrl = `${window.location.origin}${imageUrl}`;
    }
    
    const cacheBuster = `?t=${Date.now()}`;
    const urlWithCacheBust = fullUrl.includes('?') 
      ? `${fullUrl}&t=${Date.now()}` 
      : `${fullUrl}${cacheBuster}`;
    
    const response = await fetch(urlWithCacheBust, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch image: ${fullUrl}`);
      return null;
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

// Helper to get item price
const getItemPrice = (item) => {
  return item.discountPrice || item.regularPrice || 0;
};

// Get company initials for logo fallback
const getCompanyInitials = (companyName) => {
  if (!companyName) return 'SG';
  return companyName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// ========== GROUP ITEMS BY PRODUCT - FIXED FOR EDITED ORDERS ==========
const groupItemsByProduct = (items) => {
  if (!items || items.length === 0) return [];
  
  const grouped = {};
  
  items.forEach((item) => {
    let productId = item.productId;
    if (productId && typeof productId === 'object' && productId._id) {
      productId = productId._id.toString();
    } else if (productId) {
      productId = productId.toString();
    } else {
      productId = `item-${Math.random()}`;
    }
    
    if (!grouped[productId]) {
      grouped[productId] = {
        productId: productId,
        productName: item.productName || item.name || 'Unknown Product',
        image: item.image || '',
        regularPrice: item.regularPrice || 0,
        discountPrice: item.discountPrice || 0,
        unit: item.unit || 'pcs',
        colors: [],
        hasSale: item.discountPrice > 0 && item.discountPrice < item.regularPrice,
        totalQuantity: 0
      };
    }
    
    let hasColor = false;
    let colorQty = item.quantity || 0;
    let colorPrice = item.discountPrice || item.regularPrice || 0;
    
    // Check for colors array
    if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
      const validColors = item.colors.filter(c => 
        c && 
        c.color && 
        c.color !== 'null' && 
        c.color !== '' && 
        c.color !== 'undefined' &&
        c.color !== 'null'
      );
      
      if (validColors.length > 0) {
        validColors.forEach(c => {
          const qty = c.quantity || 0;
          const p = c.price || colorPrice;
          const color = c.color;
          
          const existingColor = grouped[productId].colors.find(g => g.color === color);
          if (existingColor) {
            existingColor.quantity += qty;
          } else {
            grouped[productId].colors.push({
              color: color,
              quantity: qty,
              price: p
            });
          }
          grouped[productId].totalQuantity += qty;
        });
        hasColor = true;
      }
    }
    
    // Check for selectedColor
    if (!hasColor && item.selectedColor && 
        item.selectedColor !== 'null' && 
        item.selectedColor !== '' && 
        item.selectedColor !== 'undefined' &&
        item.selectedColor !== 'null') {
      
      const existingColor = grouped[productId].colors.find(g => g.color === item.selectedColor);
      if (existingColor) {
        existingColor.quantity += colorQty;
      } else {
        grouped[productId].colors.push({
          color: item.selectedColor,
          quantity: colorQty,
          price: colorPrice
        });
      }
      grouped[productId].totalQuantity += colorQty;
      hasColor = true;
    }
    
    // No color - add as default
    if (!hasColor) {
      const existingDefault = grouped[productId].colors.find(g => g.color === null);
      if (existingDefault) {
        existingDefault.quantity += colorQty;
      } else {
        grouped[productId].colors.push({
          color: null,
          quantity: colorQty,
          price: colorPrice
        });
      }
      grouped[productId].totalQuantity += colorQty;
    }
  });
  
  return Object.values(grouped);
};

export const generateInvoicePDF = async (order) => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (2 * margin);
    let yPos = margin;

    // ========== FETCH DYNAMIC LOGO FROM NAVBAR ==========
    let companyLogoBase64 = null;
    
    try {
      const navbarLogo = await fetchNavbarData();
      if (navbarLogo && navbarLogo.logoUrl) {
        const result = await imageToBase64(navbarLogo.logoUrl);
        if (result) {
          companyLogoBase64 = result;
          console.log('✅ Logo loaded from navbar successfully');
        }
      }
    } catch (error) {
      console.warn('Failed to load logo from navbar:', error);
    }

    // ==================== HEADER ====================
    // Smart Gadget header bar - Dark Navy Blue (#1E3A5F)
    doc.setFillColor(30, 58, 95);
    doc.rect(0, 0, pageWidth, 32, 'F');
    
    doc.setFillColor(COLORS.white);
    doc.roundedRect(margin, yPos, contentWidth, 26, 2, 2, 'F');

    const logoSize = 18;
    const logoX = margin + 5;
    const logoY = yPos + 4;

    // Logo or initials
    if (companyLogoBase64) {
      try {
        const img = new Image();
        img.src = companyLogoBase64;
        
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        
        let imgWidth = img.width;
        let imgHeight = img.height;
        let finalWidth = logoSize;
        let finalHeight = logoSize;
        
        const aspectRatio = imgWidth / imgHeight;
        
        if (aspectRatio > 1) {
          finalWidth = logoSize;
          finalHeight = logoSize / aspectRatio;
        } else {
          finalHeight = logoSize;
          finalWidth = logoSize * aspectRatio;
        }
        
        const offsetX = (logoSize - finalWidth) / 2;
        const offsetY = (logoSize - finalHeight) / 2;
        
        doc.addImage(companyLogoBase64, 'PNG', logoX + offsetX, logoY + offsetY, finalWidth, finalHeight);
        console.log('✅ Logo added to PDF');
      } catch (error) {
        console.error('Error adding logo to PDF:', error);
        const initials = getCompanyInitials('Smart Gadget');
        doc.setFillColor(30, 58, 95);
        doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.white);
        doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
      }
    } else {
      const initials = getCompanyInitials('Smart Gadget');
      doc.setFillColor(30, 58, 95);
      doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.white);
      doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
    }

    const companyX = logoX + logoSize + 8;

    // ========== SMART GADGET COMPANY NAME ==========
    // "Smart" in Dark Navy, "Gadget" in Blue-600
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    
    doc.setTextColor(30, 58, 95);
    doc.text('Smart', companyX, logoY + 4);
    
    const smartWidth = doc.getTextWidth('Smart');
    doc.setTextColor(37, 99, 235);
    doc.text('Gadget', companyX + smartWidth, logoY + 4);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textLight);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Contact: ', companyX, logoY + 9);
    const contactLabelWidth = doc.getTextWidth('Contact: ');
    doc.setFont('helvetica', 'normal');
    doc.text('+8801XXXXXXXXX', companyX + contactLabelWidth, logoY + 9);

    doc.setFontSize(6.5);
    doc.text('info@smartgadget.com', companyX, logoY + 13);

    doc.setFontSize(6);
    const companyAddressLines = doc.splitTextToSize('House #470, Avenue 6, Road 6, Mirpur DOHS, Dhaka', 70);
    doc.text(companyAddressLines, companyX, logoY + 17);

    const rightAlignX = pageWidth - margin - 5;
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    const invoiceNoText = `INVOICE NO: `;
    const orderNumber = order.orderNumber || order._id.slice(-8).toUpperCase();
    doc.text(invoiceNoText, rightAlignX - doc.getTextWidth(invoiceNoText + orderNumber), yPos + 8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.text);
    doc.text(orderNumber, rightAlignX, yPos + 8, { align: 'right' });

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textLight);
    
    const orderDate = formatDate(order.createdAt);
    const status = order.orderStatus?.toUpperCase() || 'PLACED';
    const paymentMethod = order.paymentMethod?.toUpperCase() || 'COD';
    
    doc.text(`Date: ${orderDate}`, rightAlignX, yPos + 11.5, { align: 'right' });
    
    let statusColor = COLORS.unpaid;
    if (status === 'DELIVERED') statusColor = COLORS.paid;
    else if (status === 'CANCELLED') statusColor = COLORS.unpaid;
    doc.setTextColor(statusColor);
    doc.text(`Status: ${status}`, rightAlignX, yPos + 15.5, { align: 'right' });
    doc.setTextColor(COLORS.textLight);
    
    doc.text(`Payment: ${paymentMethod}`, rightAlignX, yPos + 19.5, { align: 'right' });

    // ==================== CUSTOMER & DELIVERY INFO SECTION ====================
    yPos += 34;
    
    const customerColWidth = (contentWidth / 2) - 3;
    const addressColWidth = (contentWidth / 2) - 3;
    
    let leftColHeight = 25;
    let rightColHeight = 25;
    
    const customerInfoLines = [
      `Name: ${order.customerInfo.fullName || 'N/A'}`,
      order.customerInfo.email ? `Email: ${order.customerInfo.email}` : null,
      `Phone: ${order.customerInfo.phone || 'N/A'}`,
      `Address: ${order.customerInfo.address || 'N/A'}`
    ].filter(Boolean);
    leftColHeight = Math.max(leftColHeight, 10 + (customerInfoLines.length * 4.5));
    
    const deliveryAddressLines = [
      order.customerInfo.area ? `Area/Union: ${order.customerInfo.area}` : null,
      order.customerInfo.zone ? `Upazila/Thana: ${order.customerInfo.zone}` : null,
      order.customerInfo.city ? `District/City: ${order.customerInfo.city}` : null,
      order.customerInfo.division ? `Division: ${order.customerInfo.division}` : null,
    ].filter(Boolean);
    rightColHeight = Math.max(rightColHeight, 10 + (deliveryAddressLines.length * 4.5));
    
    const colHeight = Math.max(leftColHeight, rightColHeight, 35);
    
    // Left Column - Customer Info
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(margin, yPos, customerColWidth, colHeight, 2, 2, 'F');
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text('CUSTOMER INFO', margin + 5, yPos + 5);
    
    let leftY = yPos + 10;
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Name:', margin + 5, leftY);
    doc.setFont('helvetica', 'normal');
    doc.text(order.customerInfo.fullName || 'N/A', margin + 30, leftY);
    leftY += 4.5;
    
    if (order.customerInfo.email) {
      doc.setFont('helvetica', 'bold');
      doc.text('Email:', margin + 5, leftY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.email, margin + 30, leftY);
      leftY += 4.5;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text('Phone:', margin + 5, leftY);
    doc.setFont('helvetica', 'normal');
    doc.text(order.customerInfo.phone || 'N/A', margin + 30, leftY);
    leftY += 4.5;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Address:', margin + 5, leftY);
    doc.setFont('helvetica', 'normal');
    const addressValue = order.customerInfo.address || 'N/A';
    const addressLines = doc.splitTextToSize(addressValue, customerColWidth - 35);
    for (let i = 0; i < addressLines.length; i++) {
      const xPos = i === 0 ? margin + 30 : margin + 5 + 5;
      doc.text(addressLines[i], xPos, leftY + (i * 4));
    }
    
    // Right Column - Delivery Address
    const addressColX = margin + customerColWidth + 6;
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(addressColX, yPos, addressColWidth, colHeight, 2, 2, 'F');
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text('DELIVERY ADDRESS', addressColX + 5, yPos + 5);
    
    let rightY = yPos + 10;
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);
    
    if (order.customerInfo.area) {
      doc.setFont('helvetica', 'bold');
      doc.text('Area/Union:', addressColX + 5, rightY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.area, addressColX + 40, rightY);
      rightY += 4.5;
    }
    
    if (order.customerInfo.zone) {
      doc.setFont('helvetica', 'bold');
      doc.text('Upazila/Thana:', addressColX + 5, rightY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.zone, addressColX + 40, rightY);
      rightY += 4.5;
    }
    
    if (order.customerInfo.city) {
      doc.setFont('helvetica', 'bold');
      doc.text('District/City:', addressColX + 5, rightY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.city, addressColX + 40, rightY);
      rightY += 4.5;
    }
    
    if (order.customerInfo.division) {
      doc.setFont('helvetica', 'bold');
      doc.text('Division:', addressColX + 5, rightY);
      doc.setFont('helvetica', 'normal');
      doc.text(order.customerInfo.division, addressColX + 40, rightY);
      rightY += 4.5;
    }
    
    yPos += colHeight + 10;

    // ==================== ITEMS TABLE WITH COLOR SWATCHES ====================
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.text);
    doc.text('ORDER ITEMS', margin, yPos);
    yPos += 5;

    // Table Column Positions
    const colPositions = {
      item: margin + 3,
      product: margin + 10,
      color: margin + contentWidth - 95,
      unit: margin + contentWidth - 75,
      qty: margin + contentWidth - 60,
      price: margin + contentWidth - 40,
      total: margin + contentWidth - 10
    };

    // Table Header - Smart Gadget Navy Blue
    doc.setFillColor(30, 58, 95);
    doc.rect(margin, yPos, contentWidth, 7, 'F');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.white);

    doc.text('#', colPositions.item, yPos + 4.5);
    doc.text('Product', colPositions.product, yPos + 4.5);
    doc.text('Color', colPositions.color, yPos + 4.5);
    doc.text('Unit', colPositions.unit, yPos + 4.5);
    doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
    doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
    doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });

    yPos += 10;

    let rowCount = 0;
    
    // ========== GROUP ITEMS BY PRODUCT FOR PROPER DISPLAY ==========
    const groupedItems = groupItemsByProduct(order.items || []);
    
    groupedItems.forEach((group, index) => {
      const price = group.discountPrice || group.regularPrice || 0;
      const unit = group.unit || 'pcs';
      
      const colors = group.colors || [];
      const totalRows = colors.length > 0 ? colors.length : 1;
      const rowHeight = 7;
      
      if (yPos + (rowHeight * totalRows) > pageHeight - 55) {
        doc.addPage();
        yPos = margin + 10;
        rowCount = 0;
        
        doc.setFillColor(30, 58, 95);
        doc.rect(margin, yPos, contentWidth, 7, 'F');
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.white);
        doc.text('#', colPositions.item, yPos + 4.5);
        doc.text('Product', colPositions.product, yPos + 4.5);
        doc.text('Color', colPositions.color, yPos + 4.5);
        doc.text('Unit', colPositions.unit, yPos + 4.5);
        doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
        doc.text('Price', colPositions.price, yPos + 4.5, { align: 'right' });
        doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
        yPos += 10;
      }

      // Show each color as a row
      colors.forEach((colorObj, colorIdx) => {
        const isFirstRow = colorIdx === 0;
        const colorTotal = colorObj.price * colorObj.quantity;
        const hasColor = colorObj.color !== null && colorObj.color !== 'null' && colorObj.color !== '';
        
        if (rowCount % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
        }
        
        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(COLORS.text);
        
        const textY = yPos + 4;
        
        // # column - show only on first row
        if (isFirstRow) {
          doc.text((index + 1).toString(), colPositions.item, textY);
        }
        
        // Product column
        if (isFirstRow) {
          let productName = group.productName || '';
          const maxWidth = 55;
          while (doc.getTextWidth(productName) > maxWidth && productName.length > 3) {
            productName = productName.substring(0, productName.length - 1);
          }
          if (productName !== (group.productName || '')) {
            productName = productName.substring(0, productName.length - 3) + '...';
          }
          doc.text(productName, colPositions.product, textY);
        } else {
          // Sub-row - show indentation with └─
          doc.setTextColor(COLORS.textMuted);
          doc.text('', colPositions.product + 5, textY);
          doc.setTextColor(COLORS.text);
        }
        
        // Color column - draw swatch
        const colorX = colPositions.color;
        if (hasColor) {
          const swatchSize = 4.5;
          const swatchY = yPos + 1;
          drawColorSwatch(doc, colorX, swatchY, colorObj.color, swatchSize);
        } else {
          doc.setTextColor(COLORS.textMuted);
          doc.text('—', colorX, textY);
          doc.setTextColor(COLORS.text);
        }
        
        // Unit - show only on first row
        if (isFirstRow) {
          doc.text(unit, colPositions.unit, textY);
        }
        
        // Qty
        doc.text(colorObj.quantity.toString(), colPositions.qty, textY, { align: 'right' });
        
        // Price - show only on first row
        if (isFirstRow) {
          doc.text(formatPrice(colorObj.price), colPositions.price, textY, { align: 'right' });
        }
        
        // Total
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.primary);
        doc.text(formatPrice(colorTotal), colPositions.total, textY, { align: 'right' });
        
        yPos += rowHeight;
        rowCount++;
      });
    });

    yPos += 5;

    // ==================== SUMMARY SECTION ====================
    const summaryWidth = 85;
    const summaryX = pageWidth - margin - summaryWidth;
    
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(COLORS.primary);
    doc.setLineWidth(0.3);
    doc.roundedRect(summaryX, yPos, summaryWidth, 45, 2, 2, 'FD');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text('SUMMARY', summaryX + 3, yPos + 5);

    let summaryY = yPos + 9;
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);

    const subtotal = order.subtotal || 0;
    const shippingCost = order.shippingCost || 0;
    const discount = order.discount || 0;
    const total = order.total || 0;

    doc.text('Subtotal:', summaryX + 3, summaryY);
    doc.text(formatPrice(subtotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
    summaryY += 4.5;

    doc.text('Shipping:', summaryX + 3, summaryY);
    doc.text(formatPrice(shippingCost), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
    summaryY += 4.5;

    if (discount > 0) {
      doc.setTextColor(COLORS.paid);
      doc.text('Discount:', summaryX + 3, summaryY);
      doc.text(`-${formatPrice(discount)}`, summaryX + summaryWidth - 3, summaryY, { align: 'right' });
      doc.setTextColor(COLORS.text);
      summaryY += 4.5;
    }

    doc.setDrawColor(COLORS.primary);
    doc.setLineWidth(0.3);
    doc.line(summaryX + 3, summaryY - 1, summaryX + summaryWidth - 3, summaryY - 1);
    
    summaryY += 2;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text('TOTAL:', summaryX + 3, summaryY);
    doc.text(formatPrice(total), summaryX + summaryWidth - 3, summaryY, { align: 'right' });

    yPos += 55;

    // ==================== ORDER NOTES ====================
    if (order.customerInfo?.note) {
      if (yPos > pageHeight - 35) {
        doc.addPage();
        yPos = margin + 10;
      }
      
      doc.setDrawColor(COLORS.primary);
      doc.setLineWidth(0.3);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 5;
      
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.primary);
      doc.text('ORDER NOTES:', margin, yPos);
      
      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLORS.textLight);
      
      const noteLines = doc.splitTextToSize(order.customerInfo.note, contentWidth);
      doc.text(noteLines, margin, yPos + 4);
      yPos += (noteLines.length * 4) + 10;
    }

    // ==================== FOOTER ====================
    const footerY = pageHeight - 8;
    
    doc.setDrawColor(COLORS.primary);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);
    
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textMuted);
    
    doc.text('Thank you for shopping with Smart Gadget! ✦', pageWidth / 2, footerY, { align: 'center' });
    doc.text('For any queries, contact us at support@smartgadget.com', pageWidth / 2, footerY + 4, { align: 'center' });

    // ==================== SAVE PDF ====================
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${orderNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true, fileName: `Invoice_${orderNumber}.pdf` };
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
};