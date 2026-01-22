'use client'

import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { Award, Building2, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-300">Our Story</h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors duration-300">
            Founded in 2023 by a team of real estate veterans and blockchain innovators,
            BlockEstate emerged from a simple yet powerful idea: make premium real estate
            investment accessible to everyone.
          </p>
        </div>

        {/* Origin Story */}
        <div className="mb-16">
          <Card className="bg-white dark:bg-gray-800/50 border-slate-200 dark:border-gray-700 transition-colors duration-300">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-300">The BlockEstate Origin</h2>
              <p className="text-slate-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                A chance meeting between our founders - real estate investment expert Ruslan Chukhrai and business expert Jan Strandberg - changed the future of real estate investing.
              </p>
              <p className="text-slate-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                Jan had spent years watching talented investors being priced out of premium real estate
                markets, while Harrison was exploring ways to use blockchain technology to democratize
                traditional investment structures.
              </p>
              <p className="text-slate-600 dark:text-gray-400 transition-colors duration-300">
                Together, they envisioned a platform that would combine the security of traditional real
                estate investment with the accessibility of blockchain technology. After months of
                development and legal consultation, BlockEstate was born.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Building2,
              stat: "$50M+",
              label: "Property Value Tokenized"
            },
            {
              icon: Users,
              stat: "15,000+",
              label: "Active Investors"
            },
            {
              icon: Award,
              stat: "25+",
              label: "Premium Properties"
            }
          ].map((item, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800/50 border-slate-200 dark:border-gray-700 transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <item.icon className="h-12 w-12 text-[#3B82F6] mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2 text-slate-900 dark:text-white transition-colors duration-300">{item.stat}</div>
                <div className="text-slate-600 dark:text-gray-400 transition-colors duration-300">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission */}
        <div className="mb-16">
          <Card className="bg-white dark:bg-gray-800/50 border-slate-200 dark:border-gray-700 transition-colors duration-300">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white transition-colors duration-300">Our Mission</h2>
              <p className="text-slate-600 dark:text-gray-400 transition-colors duration-300">
                BlockEstate&apos;s mission is to democratize real estate investment by removing traditional
                barriers to entry while maintaining the highest standards of security and transparency.
                We believe that everyone should have the opportunity to invest in premium real estate,
                regardless of their net worth or investment experience.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white transition-colors duration-300">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Jan Strandberg",
                role: "CEO & Co-Founder",
                image: "/blog/jan.jpg"
              },
              {
                name: "Ruslan Chukhrai",
                role: "Investor",
                image: "/blog/ruslan.jpg"
              },
              {
                name: "Harrison Frye",
                role: "CGO & Co-Founder",
                image: "/blog/harrison.jpg"
              },
              
            ].map((member, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800/50 border-slate-200 dark:border-gray-700 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-1 text-slate-900 dark:text-white transition-colors duration-300">{member.name}</h3>
                  <p className="text-slate-600 dark:text-gray-400 text-center transition-colors duration-300">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 