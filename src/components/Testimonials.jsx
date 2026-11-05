import React from 'react';
import { Star, CheckCircle, MessageSquareHeart } from 'lucide-react';
import { REVIEWS } from '../data/smartfixData';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-gradient-to-b from-white via-blue-50/20 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <MessageSquareHeart className="w-3.5 h-3.5 text-blue-700" />
            Khách hàng nói gì về SmartFix?
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Đánh Giá Thực Tế Từ Khách Hàng Đà Nẵng
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Hơn 2.400+ đánh giá 5 sao từ các gia đình, căn hộ cao cấp và chủ cơ sở lưu trú khắp thành phố Đà Nẵng.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div>
                {/* Top User Meta & Stars */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100 shadow-xs"
                    />
                    <div>
                      <h3 className="font-bold text-blue-950 text-base flex items-center gap-1.5">
                        <span>{review.name}</span>
                        <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-100 shrink-0" />
                      </h3>
                      <p className="text-xs text-slate-500">{review.district}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Service Tag */}
                <div className="inline-block px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 text-xs font-semibold mb-4 border border-blue-100">
                  Dịch vụ đã làm: <span className="font-bold">{review.service}</span>
                </div>

                {/* Comment Text */}
                <p className="text-sm text-slate-700 leading-relaxed italic relative">
                  "{review.comment}"
                </p>
              </div>

              {/* Review Date */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{review.date}</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  ✓ Đã nghiệm thu & bảo hành
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center p-6 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex -space-x-2 overflow-hidden">
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Customer" />
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Customer" />
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" alt="Customer" />
            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" alt="Customer" />
          </div>
          <div className="text-sm text-slate-700 text-left">
            <strong className="text-blue-950">99.4% Khách hàng</strong> tại Đà Nẵng sẵn sàng giới thiệu SmartFix cho bạn bè và người thân.
          </div>
        </div>

      </div>
    </section>
  );
}
