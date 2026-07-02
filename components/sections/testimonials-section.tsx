'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Chị Nguyễn Thị Lan',
    nameEn: 'Ms. Nguyen Thi Lan',
    location: 'Quận 1, TP.HCM',
    quote: 'Con tôi từ không thể viết tiếng Anh, sau 6 tháng học tại EPath đã tự học online không cần nhắc nhở. Điều tôi ấn tượng nhất là phương pháp Blended Learning giúp con linh hoạt thời gian mà vẫn đảm bảo chất lượng.',
    quoteEn: 'My child who couldn\'t write English, after 6 months at EPath now studies online without reminders. What impressed me most is the Blended Learning method that gives flexibility while ensuring quality.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Anh Trần Văn Minh',
    nameEn: 'Mr. Tran Van Minh',
    location: 'Thủ Đức, TP.HCM',
    quote: 'Vợ chồng tôi bận rộn với công việc, không có nhiều thời gian kèm con học. EPath đã thay chúng tôi theo dõi tiến độ học tập và báo cáo định kỳ rất chi tiết.',
    quoteEn: 'My spouse and I are busy with work and don\'t have much time to tutor our child. EPath has taken over tracking progress and providing detailed periodic reports for us.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Chị Phạm Thị Hương',
    nameEn: 'Ms. Pham Thi Huong',
    location: 'Bình Thạnh, TP.HCM',
    quote: 'Chúng tôi đã thử nhiều trung tâm nhưng EPath là nơi duy nhất có lộ trình học tập liên tục từ mầm non đến THPT. Con không bị đứt gãy kiến thức và tự tin hơn rất nhiều khi thi Cambridge.',
    quoteEn: 'We\'ve tried many centers but EPath is the only one with continuous learning pathway from kindergarten to high school. My child\'s knowledge isn\'t interrupted and is much more confident taking Cambridge exams.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#231F20] mb-4">
            Phụ huynh nói gì về EPath?
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            What Parents Say About EPath
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-[#F8F9FA] rounded-2xl p-8 md:p-12 relative shadow-lg border border-[#3A53A3]/10">
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-[#3A53A3] rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[#3A53A3] to-[#8BC53F] flex items-center justify-center text-white text-2xl font-bold">
                      {testimonials[current].name.split(' ').map((n) => n[0]).slice(-2).join('')}
                    </div>

                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#F05A28] text-[#F05A28]" />
                      ))}
                    </div>

                    <blockquote className="text-lg md:text-xl text-[#231F20] leading-relaxed mb-6 italic">
                      &quot;{testimonials[current].quote}&quot;
                    </blockquote>

                    <div>
                      <div className="font-semibold text-[#3A53A3] text-lg">
                        {testimonials[current].name}
                      </div>
                      <div className="text-[#6B6B6B] text-sm">
                        {testimonials[current].location}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#3A53A3] hover:text-white transition-colors duration-150 border border-[#3A53A3]/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button
            onClick={next}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#3A53A3] hover:text-white transition-colors duration-150 border border-[#3A53A3]/20"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1)
                setCurrent(index)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-150 ${
                index === current ? 'bg-[#3A53A3] w-8' : 'bg-[#3A53A3]/30 hover:bg-[#3A53A3]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
