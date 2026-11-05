// Input Validation & XSS Sanitization Helper for SmartFix

// Sanitize string to prevent XSS / script injection
export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // Strip < and > tags
    .trim();
}

// Validate Vietnamese phone number
export function isValidVietnamesePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleanPhone = phone.replace(/[\s.-]/g, '');
  const vnPhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
  return vnPhoneRegex.test(cleanPhone);
}

// Validate booking payload
export function validateBookingInput(data) {
  const errors = [];

  const fullName = sanitizeString(data.fullName);
  if (!fullName || fullName.length < 2 || fullName.length > 80) {
    errors.push('Họ và tên không hợp lệ (từ 2 đến 80 ký tự)');
  }

  const phone = data.phoneNumber ? data.phoneNumber.trim() : '';
  if (!isValidVietnamesePhone(phone)) {
    errors.push('Số điện thoại không hợp lệ (ví dụ: 0905123456)');
  }

  const addressDetail = sanitizeString(data.addressDetail);
  if (!addressDetail || addressDetail.length < 3 || addressDetail.length > 200) {
    errors.push('Địa chỉ cụ thể không hợp lệ (từ 3 đến 200 ký tự)');
  }

  const districtInput = sanitizeString(data.district || '').toLowerCase();
  let normalizedDistrict = '';

  if (districtInput.includes('hải châu') || districtInput === 'hai-chau') {
    normalizedDistrict = 'Quận Hải Châu';
  } else if (districtInput.includes('thanh khê') || districtInput === 'thanh-khe') {
    normalizedDistrict = 'Quận Thanh Khê';
  } else if (districtInput.includes('sơn trà') || districtInput === 'son-tra') {
    normalizedDistrict = 'Quận Sơn Trà';
  } else if (districtInput.includes('ngũ hành sơn') || districtInput === 'ngu-hanh-son') {
    normalizedDistrict = 'Quận Ngũ Hành Sơn';
  } else if (districtInput.includes('cẩm lệ') || districtInput === 'cam-le') {
    normalizedDistrict = 'Quận Cẩm Lệ';
  } else if (districtInput.includes('liên chiểu') || districtInput === 'lien-chieu') {
    normalizedDistrict = 'Quận Liên Chiểu';
  } else if (districtInput.includes('hòa vang') || districtInput === 'hoa-vang') {
    normalizedDistrict = 'Huyện Hòa Vang';
  } else {
    errors.push('Quận/Huyện tại Đà Nẵng không hợp lệ');
  }

  const acQuantity = parseInt(data.acQuantity, 10);
  if (isNaN(acQuantity) || acQuantity < 1 || acQuantity > 20) {
    errors.push('Số lượng máy phải từ 1 đến 20 máy');
  }

  // Validate appointment date: MUST NOT be in the past
  const scheduleTypeStr = sanitizeString(data.scheduleType || '');
  const dateMatch = scheduleTypeStr.match(/(\d{4}-\d{2}-\d{2})/);
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  if (dateMatch) {
    const selectedDate = dateMatch[1];
    if (selectedDate < todayStr) {
      errors.push(`Ngày hẹn (${selectedDate}) không thể ở trong quá khứ. Vui lòng chọn ngày hôm nay hoặc tương lai.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: {
      fullName,
      phoneNumber: phone.replace(/[\s.-]/g, ''),
      district: normalizedDistrict,
      addressDetail,
      fullAddress: `${addressDetail}, ${normalizedDistrict}, Đà Nẵng`,
      serviceName: sanitizeString(data.serviceName || 'Vệ sinh máy lạnh treo tường'),
      servicePriceDisplay: sanitizeString(data.servicePriceDisplay || '150.000đ'),
      acType: sanitizeString(data.acType || 'Treo tường Inverter'),
      acBrand: sanitizeString(data.acBrand || 'Daikin'),
      acQuantity: acQuantity || 1,
      issueDescription: sanitizeString(data.issueDescription || 'Kiểm tra bảo dưỡng định kỳ'),
      scheduleType: sanitizeString(data.scheduleType || 'Cần thợ gấp (sau 30 phút)'),
      customerNote: sanitizeString(data.customerNote || ''),
      estimatedTotal: typeof data.estimatedTotal === 'number' ? data.estimatedTotal : 150000
    }
  };
}
