import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Phone, 
  MapPin, 
  User, 
  Wrench, 
  Sparkles, 
  Image as ImageIcon,
  CheckCheck
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';

export default function LiveChatModal() {
  const { 
    activeChatOrder, 
    closeChat, 
    sendChatMessage, 
    appRole, 
    technicianProfile 
  } = useOrders();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const isTechView = appRole === 'technician';

  // Quick reply messages
  const quickReplies = isTechView ? [
    'Chào anh/chị, tôi là thợ CoolCall đang trên đường tới (khoảng 15p)',
    'Tôi đã tới cổng nhà rồi ạ, phiền anh/chị mở cửa giúp tôi',
    'Tôi đã kiểm tra xong, máy đang thiếu gas và bẩn dàn lạnh',
    'Dạ đã hoàn thành xong rồi ạ, anh/chị kiểm tra độ mát giúp em nhé!'
  ] : [
    'Dạ vâng anh, đến nơi anh bấm chuông giúp em nhé!',
    'Khoảng mấy phút nữa anh tới nơi ạ?',
    'Anh kiểm tra kỹ giúp em cục nóng ngoài trời nhé!',
    'Em đã nhận máy rồi, cảm ơn anh nhiều nhé!'
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (activeChatOrder) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChatOrder?.chatMessages]);

  if (!activeChatOrder) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    sendChatMessage(activeChatOrder.id, {
      sender: isTechView ? 'technician' : 'customer',
      senderName: isTechView ? `Thợ ${technicianProfile.name}` : activeChatOrder.customerName,
      text: inputMessage.trim()
    });

    setInputMessage('');
  };

  const handleQuickReply = (text) => {
    sendChatMessage(activeChatOrder.id, {
      sender: isTechView ? 'technician' : 'customer',
      senderName: isTechView ? `Thợ ${technicianProfile.name}` : activeChatOrder.customerName,
      text
    });
  };

  const handleSimulateSendPhoto = () => {
    const sampleACPhoto = 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80';
    sendChatMessage(activeChatOrder.id, {
      sender: isTechView ? 'technician' : 'customer',
      senderName: isTechView ? `Thợ ${technicianProfile.name}` : activeChatOrder.customerName,
      text: isTechView ? '📸 Ảnh chụp hiện trường máy lạnh trước khi vệ sinh:' : '📸 Ảnh máy lạnh nhà em bị chảy nước:',
      image: sampleACPhoto
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] max-h-[92vh] text-left">
        
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-sky-900 text-white p-4 shrink-0 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white font-bold">
                {isTechView ? (
                  <User className="w-5 h-5 text-sky-200" />
                ) : (
                  <Wrench className="w-5 h-5 text-sky-200" />
                )}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-blue-950 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white truncate max-w-[170px] sm:max-w-xs">
                  {isTechView ? `Khách: ${activeChatOrder.customerName}` : (activeChatOrder.technician?.name || 'Thợ Kỹ Thuật')}
                </h4>
                <span className="text-[10px] bg-white/15 px-1.5 py-0.5 rounded text-sky-300 font-mono">
                  {activeChatOrder.bookingCode}
                </span>
              </div>
              <p className="text-[11px] text-sky-200 flex items-center gap-1 mt-0.5 truncate max-w-[200px] sm:max-w-xs">
                <MapPin className="w-3 h-3 text-sky-300 shrink-0" />
                <span className="truncate">{activeChatOrder.addressDetail}, {activeChatOrder.districtName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Call Button */}
            <a
              href={`tel:${isTechView ? activeChatOrder.customerPhone : (activeChatOrder.technician?.phone || '0905888666')}`}
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-colors cursor-pointer"
              title="Gọi điện thoại trực tiếp"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Close Chat Modal */}
            <button
              type="button"
              onClick={closeChat}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Perspective Banner */}
        <div className="bg-blue-50 px-4 py-1.5 border-b border-blue-100 flex items-center justify-between text-[11px] text-blue-900 font-semibold shrink-0">
          <span>
            {isTechView ? '🛠️ Bạn đang chat với tư cách THỢ ĐIỆN LẠNH' : '👤 Bạn đang chat với tư cách KHÁCH HÀNG'}
          </span>
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Trực tuyến
          </span>
        </div>

        {/* Message Feed Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/70">
          {activeChatOrder.chatMessages.map((msg) => {
            const isSystem = msg.sender === 'system';
            const isMe = isTechView 
              ? msg.sender === 'technician' 
              : msg.sender === 'customer';

            if (isSystem) {
              return (
                <div key={msg.id} className="text-center my-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-200/90 text-slate-700 text-[11px] font-medium max-w-sm">
                    {msg.text}
                  </span>
                </div>
              );
            }

            return (
              <div 
                key={msg.id} 
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-slate-400 mb-0.5 px-1 font-medium">
                  {msg.senderName || (msg.sender === 'technician' ? 'Thợ' : 'Khách')} • {msg.timestamp}
                </span>

                <div 
                  className={`p-3 rounded-2xl max-w-[80%] text-xs sm:text-sm font-medium shadow-xs leading-relaxed ${
                    isMe 
                      ? 'bg-blue-900 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}

                  {msg.image && (
                    <div className="mt-2 rounded-xl overflow-hidden border border-white/20">
                      <img src={msg.image} alt="Ảnh đính kèm trong chat" className="w-full max-h-48 object-cover" />
                    </div>
                  )}
                </div>

                {isMe && (
                  <span className="text-[9px] text-slate-400 mt-0.5 flex items-center gap-0.5 px-1">
                    <CheckCheck className="w-3 h-3 text-sky-600" /> Đã gửi
                  </span>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reply Chips Bar */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] text-slate-400 font-bold whitespace-nowrap">Gợi ý nhanh:</span>
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleQuickReply(reply)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-900 text-slate-600 whitespace-nowrap border border-slate-200/80 transition-colors cursor-pointer shrink-0"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSimulateSendPhoto}
            title="Gửi hình ảnh máy lạnh / hiện trường"
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-blue-900 transition-colors cursor-pointer shrink-0"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={isTechView ? "Nhắn tin cho khách hàng..." : "Nhắn tin trao đổi với thợ..."}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="p-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
