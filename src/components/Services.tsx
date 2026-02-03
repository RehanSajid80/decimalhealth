'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Lightbulb, Wrench, Target, TrendingUp } from 'lucide-react'

const services = [
  {
    id: 'ideate',
    number: '01',
    icon: Lightbulb,
    title: 'Ideate',
    color: 'coral',
    items: [
      'Explore Unmet Needs',
      'Market Needs Assessment',
      'Competitive Benchmarking',
      'Build Clinical Use-cases',
    ],
    description:
      'We help you identify real market opportunities and validate clinical use-cases that solve healthcare\'s true unmet needs.',
  },
  {
    id: 'create',
    number: '02',
    icon: Wrench,
    title: 'Create',
    color: 'teal',
    items: [
      'Patient Journey & Clinical Workflow',
      'MVP Conceptualization & Development',
      'Regulatory Pathway',
      'Evidence Generation',
    ],
    description:
      'From concept to prototype, we guide product development with clinical rigor and regulatory foresight.',
  },
  {
    id: 'gtm',
    number: '03',
    icon: Target,
    title: 'Go-to-Market',
    color: 'navy',
    items: [
      'Provider Collaboration & Payor Strategy',
      'Commercialization Strategy',
      'Channel & Pricing Strategy',
      'Pilot Implementation & Impact Assessment',
    ],
    description:
      'Launch with confidence through proven commercialization strategies and pilot programs.',
  },
  {
    id: 'scale',
    number: '04',
    icon: TrendingUp,
    title: 'Scale',
    color: 'gold',
    items: [
      'Business Development & Implementation',
      'Workshops & Trainings for BD and Sales',
      'Fundraising Support',
      'Growth Roadmap',
    ],
    description:
      'Accelerate growth with strategic partnerships, fundraising expertise, and scalable operations.',
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeService, setActiveService] = useState('ideate')

  const activeData = services.find((s) => s.id === activeService)

  return (
    <section ref={ref} id="services" className="section bg-white">
      <div className="container-lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">
            End-to-End Services to{' '}
            <span className="text-decimal-teal">Launch & Grow</span>
          </h2>
          <p className="section-subheading mx-auto">
            Our comprehensive methodology takes you from initial concept to
            scaled success, with expert guidance at every stage.
          </p>
        </motion.div>

        {/* Services Timeline */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Service Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300
                           flex items-start gap-4 group
                           ${
                             activeService === service.id
                               ? 'bg-decimal-navy text-white shadow-lg'
                               : 'bg-decimal-cream hover:bg-decimal-cream-dark'
                           }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                              ${
                                activeService === service.id
                                  ? 'bg-white/20'
                                  : 'bg-decimal-navy/10'
                              }`}
                >
                  <service.icon
                    className={`w-6 h-6 ${
                      activeService === service.id
                        ? 'text-white'
                        : 'text-decimal-navy'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div
                    className={`text-sm font-bold mb-1
                                ${
                                  activeService === service.id
                                    ? 'text-decimal-cyan'
                                    : 'text-decimal-teal'
                                }`}
                  >
                    {service.number}
                  </div>
                  <h3
                    className={`text-xl font-bold
                                ${
                                  activeService === service.id
                                    ? 'text-white'
                                    : 'text-decimal-navy'
                                }`}
                  >
                    {service.title}
                  </h3>
                </div>
              </button>
            ))}
          </motion.div>

          {/* Right: Service Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:sticky lg:top-32"
          >
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card-elevated"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-decimal-teal/10 flex items-center justify-center">
                  {activeData && (
                    <activeData.icon className="w-7 h-7 text-decimal-teal" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold text-decimal-teal">
                    {activeData?.number}
                  </div>
                  <h3 className="text-2xl font-bold text-decimal-navy">
                    {activeData?.title}
                  </h3>
                </div>
              </div>

              <p className="text-decimal-navy/70 mb-8">
                {activeData?.description}
              </p>

              <div className="space-y-4">
                {activeData?.items.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-decimal-cream"
                  >
                    <div className="w-8 h-8 rounded-full bg-decimal-teal/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-decimal-teal font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-decimal-navy font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
