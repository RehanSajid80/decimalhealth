'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Linkedin, Mail } from 'lucide-react'

const team = [
  {
    name: 'Kamal Jethwani',
    role: 'CEO & Co-Founder',
    bio: '15+ years in digital health, product strategy, design and validation. 150+ publications with 2000+ citations in peer-reviewed literature. 10+ FDA apps submitted.',
    credentials: ['Harvard Medical School', 'Partners Healthcare'],
  },
  {
    name: 'Sunita Patolia',
    role: 'COO & Co-Founder',
    bio: '10+ years of innovation work in healthcare through strategic alliances & co-creation partnerships. Led 200+ stakeholder & end-user buy-in workshops.',
    credentials: ['Strategic Partnerships', 'Co-creation Expert'],
  },
  {
    name: 'Manasavini Mehta',
    role: 'Director of Strategy',
    bio: '8+ years of management consulting and investing. Accelerated growth for 10+ companies in healthcare and consumer tech.',
    credentials: ['Management Consulting', 'Healthcare Investing'],
  },
  {
    name: 'Emily Caplan',
    role: 'Director of Strategy Implementation',
    bio: '8+ years of health system strategy & operations. Led strategy & implementation of performance improvement & digital health initiatives.',
    credentials: ['Health System Strategy', 'Operations'],
  },
]

export default function Team() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="about" className="section bg-decimal-cream">
      <div className="container-lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">
            Meet the <span className="text-decimal-teal">Team</span>
          </h2>
          <p className="section-subheading mx-auto">
            Business strategists with 40+ years of combined experience in deep
            scientific research, clinical knowledge, and technical know-how.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-elevated h-full flex flex-col text-center">
                {/* Avatar Placeholder */}
                <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-decimal-teal to-decimal-cyan
                                flex items-center justify-center text-white text-3xl font-bold">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-decimal-navy mb-1">
                  {member.name}
                </h3>
                <div className="text-decimal-teal font-semibold text-sm mb-4">
                  {member.role}
                </div>

                <p className="text-decimal-navy/70 text-sm mb-4 flex-1">
                  {member.bio}
                </p>

                {/* Credentials */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {member.credentials.map((cred) => (
                    <span
                      key={cred}
                      className="text-xs bg-decimal-cream px-3 py-1 rounded-full text-decimal-navy/70"
                    >
                      {cred}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 pt-4 border-t border-decimal-cream">
                  <button
                    className="w-10 h-10 rounded-full bg-decimal-cream flex items-center justify-center
                               hover:bg-decimal-teal hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-decimal-cream flex items-center justify-center
                               hover:bg-decimal-teal hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
