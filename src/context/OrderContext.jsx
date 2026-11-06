import React, { createContext, useContext, useState, useEffect } from 'react';
import { playAlertSound } from '../utils/audioAlert';

const OrderContext = createContext(null);

const STORAGE_ORDERS_KEY = 'coolcall_partner_orders';
const STORAGE_ROLE_KEY = 'coolcall_active_app_role'; // 'customer' | 'technician'

const INITIAL_MOCK_ORDERS = [
  {
    id: 'CC-URG-8921',
    bookingCode: 'CC-URG-8921',
    customerName: 'Trần Anh Tuấn',
    customerPhone: '0905.123.789',
    district: 'hai-chau',
    districtName: 'Quận Hải Châu',
    addressDetail: '245 Nguyễn Tri Phương, P. Nam Dương',
    serviceTitle: 'Khắc phục máy không lạnh, kém lạnh',
    acType: 'wall-inverter',
    acBrand: 'Panasonic Inverter',
    acQuantity: 1,
    issueDescription: 'Máy bật 16 độ mà phả ra toàn hơi gió nóng, cục nóng ngoài trời kêu ù ù.',
    scheduleType: 'urgent',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentSlot: 'Có mặt sau 30 phút',
    estimatedTotal: 250000,
    status: 'pending', // 'pending' | 'accepted' | 'arrived' | 'in_progress' | 'completed' | 'rejected' | 'disputed'
    createdAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(), // 6 mins ago
    technician: null,
    chatMessages: [
      {
        id: 'msg_sys_1',
        sender: 'system',
        text: 'Đơn hàng trực tiếp cấp tốc đã được tạo. Đang phát tín hiệu tìm thợ gần nhất!',
        timestamp: 'Vừa xong'
      }
    ],
    dispute: null
  },
  {
    id: 'CC-SCH-5432',
    bookingCode: 'CC-SCH-5432',
    customerName: 'Lê Thị Bích Ngọc',
    customerPhone: '0935.456.888',
    district: 'son-tra',
    districtName: 'Quận Sơn Trà',
    addressDetail: '18 An Hải Bắc 2, P. An Hải Bắc (gần Cầu Rồng)',
    serviceTitle: 'Vệ sinh máy lạnh treo tường (2 bộ)',
    acType: 'wall-standard',
    acBrand: 'Daikin',
    acQuantity: 2,
    issueDescription: 'Máy dùng 6 tháng chưa vệ sinh, có mùi hơi hôi ẩm khi mới bật.',
    scheduleType: 'scheduled',
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    appointmentSlot: '08:00 - 10:00',
    estimatedTotal: 270000,
    status: 'pending',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    technician: null,
    chatMessages: [
      {
        id: 'msg_sys_2',
        sender: 'system',
        text: 'Đơn hẹn trước ngày mai đã ghi nhận thành công.',
        timestamp: '25 phút trước'
      }
    ],
    dispute: null
  },
  {
    id: 'CC-ACT-3310',
    bookingCode: 'CC-ACT-3310',
    customerName: 'Hoàng Minh Trí',
    customerPhone: '0914.789.333',
    district: 'thanh-khe',
    districtName: 'Quận Thanh Khê',
    addressDetail: '88 Điện Biên Phủ, P. Chính Gián',
    serviceTitle: 'Sửa máy chảy nước & Nạp gas R32',
    acType: 'wall-inverter',
    acBrand: 'LG Inverter 1.5 HP',
    acQuantity: 1,
    issueDescription: 'Nước nhỏ giọt ướt sàn nhà, làm mát rất yếu.',
    scheduleType: 'urgent',
    appointmentDate: new Date().toISOString().split('T')[0],
    appointmentSlot: 'Đang thực hiện',
    estimatedTotal: 380000,
    status: 'in_progress',
    createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    technician: {
      id: 'THO-ĐN-08',
      name: 'Nguyễn Văn Hùng',
      phone: '0905.888.666',
      rating: 4.9
    },
    chatMessages: [
      {
        id: 'msg_1',
        sender: 'technician',
        senderName: 'Thợ Nguyễn Văn Hùng',
        text: 'Chào anh Trí, tôi là Hùng kỹ thuật viên CoolCall. Tôi đã nhận đơn và đang chạy xe qua đường Điện Biên Phủ, khoảng 10 phút nữa tới nhà anh nhé!',
        timestamp: '15 phút trước'
      },
      {
        id: 'msg_2',
        sender: 'customer',
        senderName: 'Anh Trí (Khách hàng)',
        text: 'Dạ vâng anh, đến cổng bấm chuông tầng 2 giúp em nhé anh!',
        timestamp: '12 phút trước'
      },
      {
        id: 'msg_3',
        sender: 'technician',
        senderName: 'Thợ Nguyễn Văn Hùng',
        text: 'Tôi đã tới cổng nhà rồi ạ. Đang chuẩn bị máy bơm xịt rửa và đồng hồ gas lên phòng anh.',
        timestamp: '5 phút trước'
      }
    ],
    dispute: null
  }
];

export function OrderProvider({ children }) {
  // App view role: 'customer' | 'technician'
  const [appRole, setAppRole] = useState(() => {
    return localStorage.getItem(STORAGE_ROLE_KEY) || 'customer';
  });

  // Technician profile
  const [technicianProfile, setTechnicianProfile] = useState({
    id: 'THO-ĐN-08',
    name: 'Nguyễn Văn Hùng',
    phone: '0905.888.666',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=150&q=80',
    stationHub: 'Trạm Hải Châu - Thanh Khê (Đà Nẵng)',
    rating: 4.9,
    completedJobs: 184,
    todayEarnings: 650000,
    isOnline: true
  });

  // List of all orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ORDERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_MOCK_ORDERS;
  });

  // Active chat modal state: null or { orderId, isOpen }
  const [activeChatOrderId, setActiveChatOrderId] = useState(null);

  // Active dispute modal state: null or orderId
  const [activeDisputeOrderId, setActiveDisputeOrderId] = useState(null);

  // New incoming order alert modal for technician (real-time notification popup)
  const [incomingAlertOrder, setIncomingAlertOrder] = useState(null);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
  }, [orders]);

  // Switch App Role
  const switchRole = (newRole) => {
    setAppRole(newRole);
    localStorage.setItem(STORAGE_ROLE_KEY, newRole);
  };

  // Toggle Technician Online / Busy
  const toggleTechnicianOnline = () => {
    setTechnicianProfile(prev => ({
      ...prev,
      isOnline: !prev.isOnline
    }));
  };

  // 1. Customer creates a new booking order
  const createOrder = (orderData) => {
    const isUrgent = orderData.scheduleType === 'urgent';
    const newCode = `CC-${isUrgent ? 'URG' : 'SCH'}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: newCode,
      bookingCode: newCode,
      customerName: orderData.fullName || 'Khách hàng',
      customerPhone: orderData.phoneNumber || '0905.xxx.xxx',
      district: orderData.district || 'hai-chau',
      districtName: orderData.districtName || 'Đà Nẵng',
      addressDetail: orderData.addressDetail || 'Đà Nẵng',
      serviceTitle: orderData.serviceTitle || 'Bảo dưỡng máy lạnh',
      serviceId: orderData.serviceId,
      acType: orderData.acType || 'Treo tường',
      acBrand: orderData.acBrand || 'Daikin',
      acQuantity: orderData.acQuantity || 1,
      issueDescription: orderData.issueDescription || '',
      scheduleType: orderData.scheduleType || 'urgent',
      appointmentDate: orderData.appointmentDate || new Date().toISOString().split('T')[0],
      appointmentSlot: orderData.scheduleType === 'urgent' ? 'Có mặt sau 30 phút' : orderData.appointmentSlot,
      estimatedTotal: orderData.estimatedTotal || 200000,
      customerNote: orderData.customerNote || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      technician: null,
      chatMessages: [
        {
          id: 'msg_' + Date.now(),
          sender: 'system',
          text: isUrgent 
            ? '⚡ Yêu cầu CẤP TỐC 30 phút đã được gửi đến mạng lưới thợ Đà Nẵng gần bạn nhất!' 
            : '📅 Đơn đặt hẹn trước đã được tiếp nhận.',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ],
      dispute: null
    };

    setOrders(prev => [newOrder, ...prev]);

    // Trigger instant alert sound and popup for technician
    playAlertSound(isUrgent ? 'urgent' : 'scheduled');
    setIncomingAlertOrder(newOrder);

    return newOrder;
  };

  // 2. Technician accepts order
  const acceptOrder = (orderId) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const welcomeMsg = {
          id: 'msg_accept_' + Date.now(),
          sender: 'technician',
          senderName: `Thợ ${technicianProfile.name}`,
          text: `Chào bạn, tôi là thợ ${technicianProfile.name} (SĐT: ${technicianProfile.phone}). Tôi đã nhận đơn và chuẩn bị dụng cụ đến ngay địa chỉ của bạn!`,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...order,
          status: 'accepted',
          technician: {
            id: technicianProfile.id,
            name: technicianProfile.name,
            phone: technicianProfile.phone,
            rating: technicianProfile.rating
          },
          chatMessages: [...order.chatMessages, welcomeMsg]
        };
      }
      return order;
    }));

    if (incomingAlertOrder?.id === orderId) {
      setIncomingAlertOrder(null);
    }
  };

  // 3. Technician rejects order
  const rejectOrder = (orderId, reason = 'Bận cuốc khác chưa kịp đến') => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: 'rejected',
          rejectReason: reason,
          rejectedAt: new Date().toISOString()
        };
      }
      return order;
    }));

    if (incomingAlertOrder?.id === orderId) {
      setIncomingAlertOrder(null);
    }
  };

  // 4. Update order status: 'arrived' | 'in_progress' | 'completed'
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        let autoMsgText = '';
        if (newStatus === 'arrived') {
          autoMsgText = '📍 Thợ đã có mặt trước địa chỉ nhà bạn. Vui lòng mở cửa giúp thợ nhé!';
        } else if (newStatus === 'in_progress') {
          autoMsgText = '🔧 Thợ đang tiến hành kiểm tra & sửa chữa máy lạnh.';
        } else if (newStatus === 'completed') {
          autoMsgText = '✅ Đã hoàn tất sửa chữa và dọn dẹp sạch sẽ. Quý khách vui lòng kiểm tra độ mát và nghiệm thu!';
        }

        const newChatMessages = autoMsgText ? [
          ...order.chatMessages,
          {
            id: 'msg_status_' + Date.now(),
            sender: 'system',
            text: autoMsgText,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          }
        ] : order.chatMessages;

        return {
          ...order,
          status: newStatus,
          chatMessages: newChatMessages,
          completedAt: newStatus === 'completed' ? new Date().toISOString() : order.completedAt
        };
      }
      return order;
    }));
  };

  // 5. Send message in order's web chat
  const sendChatMessage = (orderId, { sender, senderName, text, image }) => {
    if (!text && !image) return;

    const newMsg = {
      id: 'msg_' + Date.now(),
      sender, // 'technician' | 'customer' | 'system'
      senderName: senderName || (sender === 'technician' ? `Thợ ${technicianProfile.name}` : 'Khách hàng'),
      text: text || '',
      image: image || null,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          chatMessages: [...order.chatMessages, newMsg]
        };
      }
      return order;
    }));
  };

  // 6. Technician files dispute when customer refuses to pay (Khiếu nại khách quỵt tiền)
  const fileDispute = (orderId, { reason, unpaidAmount, evidenceNote }) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const disputeData = {
          reason: reason || 'Khách không chịu thanh toán tiền công/linh kiện',
          unpaidAmount: unpaidAmount || order.estimatedTotal,
          evidenceNote: evidenceNote || 'Khách tắt máy / rời đi sau khi thợ sửa xong',
          filedAt: new Date().toISOString(),
          status: 'pending_review',
          disputeCode: 'DISP-' + Math.floor(10000 + Math.random() * 90000)
        };

        const sysMsg = {
          id: 'msg_disp_' + Date.now(),
          sender: 'system',
          text: `⚠️ THỢ ĐÃ GỬI KHIẾU NẠI KHÔNG THANH TOÁN (Mã: ${disputeData.disputeCode}) với số tiền ${Number(disputeData.unpaidAmount).toLocaleString('vi-VN')}đ. Tổng đài CoolCall đang can thiệp giải quyết và bảo vệ 100% tiền công cho thợ!`,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };

        return {
          ...order,
          status: 'disputed',
          dispute: disputeData,
          chatMessages: [...order.chatMessages, sysMsg]
        };
      }
      return order;
    }));

    setActiveDisputeOrderId(null);
  };

  // Helper count of pending orders for notification badges
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const urgentPendingCount = orders.filter(o => o.status === 'pending' && o.scheduleType === 'urgent').length;
  const activeOrders = orders.filter(o => ['accepted', 'arrived', 'in_progress'].includes(o.status));

  // Get active order currently open in chat
  const activeChatOrder = orders.find(o => o.id === activeChatOrderId) || null;

  return (
    <OrderContext.Provider
      value={{
        appRole,
        isTechnicianView: appRole === 'technician',
        isCustomerView: appRole === 'customer',
        switchRole,
        technicianProfile,
        toggleTechnicianOnline,
        orders,
        pendingCount,
        urgentPendingCount,
        activeOrders,
        createOrder,
        acceptOrder,
        rejectOrder,
        updateOrderStatus,
        sendChatMessage,
        fileDispute,
        activeChatOrderId,
        activeChatOrder,
        openChat: (orderId) => setActiveChatOrderId(orderId),
        closeChat: () => setActiveChatOrderId(null),
        activeDisputeOrderId,
        openDisputeModal: (orderId) => setActiveDisputeOrderId(orderId),
        closeDisputeModal: () => setActiveDisputeOrderId(null),
        incomingAlertOrder,
        dismissIncomingAlert: () => setIncomingAlertOrder(null)
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
