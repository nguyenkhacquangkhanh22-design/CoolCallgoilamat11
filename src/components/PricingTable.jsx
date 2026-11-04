import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Tag, 
  Info,
  ArrowRight
} from 'lucide-react';
import { PRICING_LIST } from '../data/coolcallData';

export default function PricingTable({ onSelectPriceItem }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPricing = PRICING_LIST.filter(p => 
    p.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <Tag className="w-3.5 h-3.5 text-blue-700" />
            Minh bạch tuyệt đối
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Bảng Giá Dịch Vụ Niêm Yết Công Khai
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            CoolCall cam kết 100% không nói thách, không vẽ bệnh và không phát sinh bất kỳ khoản phí nào ngoài báo giá đã thỏa thuận với khách hàng.
          </p>

          {/* Quick Filter Search */}
          <div className="mt-6 max-w-md mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm hạng mục (VD: Vệ sinh, Gas, Tụ điện, Tháo lắp...)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 shadow-xs"
            />
          </div>
        </div>

        {/* Pricing Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-900/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-950 text-white text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-bold">Hạng mục dịch vụ / Thay thế linh kiện</th>
                  <th className="py-4 px-6 font-bold text-center">Đơn giá niêm yết</th>
                  <th className="py-4 px-6 font-bold hidden sm:table-cell">Ghi chú & Ưu đãi</th>
                  <th className="py-4 px-6 font-bold text-center">Bảo hành</th>
                  <th className="py-4 px-6 font-bold text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredPricing.map((item, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-blue-50/50 transition-colors group"
                  >
                    <td className="py-4 px-6 font-bold text-blue-950">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-150 transition-transform" />
                        <span>{item.item}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-extrabold text-blue-900 text-center whitespace-nowrap">
                      <span className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-100 group-hover:bg-blue-100 transition-colors">
                        {item.price}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-slate-600 text-xs hidden sm:table-cell">
                      {item.note}
                    </td>

                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      {item.warranty !== '-' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                          <ShieldCheck className="w-3 h-3" />
                          {item.warranty}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">-</span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onSelectPriceItem(item)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-900 hover:text-white bg-blue-50 hover:bg-blue-900 px-3 py-1.5 rounded-lg border border-blue-200 hover:border-blue-900 transition-all cursor-pointer"
                      >
                        <span>Đặt thợ</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Giá trên áp dụng cho máy lạnh dân dụng treo tường tại địa bàn Đà Nẵng. Chưa bao gồm giàn giáo nếu thi công nhà cao tầng.</span>
            </div>
            <div className="font-semibold text-blue-950">
              Cần xuất hóa đơn VAT điện tử: Vui lòng ghi chú khi đặt lịch
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
