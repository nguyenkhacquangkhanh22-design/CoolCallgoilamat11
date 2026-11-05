import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { FAQS } from '../data/smartfixData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            Giải đáp thắc mắc
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Câu Hỏi Thường Gặp Khi Đặt Thợ
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Tổng hợp những câu hỏi khách hàng thường băn khoăn khi cần sửa chữa và vệ sinh máy lạnh tại Đà Nẵng.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 text-left">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-white hover:bg-blue-50/40 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-blue-950">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-blue-900 text-white rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/40 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact box if still confused */}
        <div className="mt-12 p-6 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div>
            <h4 className="font-bold text-blue-950 text-base">Bạn còn câu hỏi khác về tình trạng máy lạnh?</h4>
            <p className="text-xs text-slate-600 mt-0.5">Kỹ thuật viên trưởng SmartFix sẵn sàng tư vấn trực tiếp miễn phí qua Zalo / Hotline.</p>
          </div>
          <a
            href="tel:0905888666"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-sky-300" />
            <span>Gọi 0905.888.666</span>
          </a>
        </div>

      </div>
    </section>
  );
}
