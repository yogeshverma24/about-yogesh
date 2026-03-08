import Breadcrumb from '@/components/Breadcrumb'

export default function TermsOfUse() {
  return (
    <div>
      <Breadcrumb
        title="Terms Of Use"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Terms Of Use', href: '/terms-of-use' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2">
                  <span className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>10 Dec 2018</span>
                  </span>
                </p>
              </div>
              <h2 className="text-3xl font-bold mb-6">Terms Of Use</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg">
                  Coming Soon...!
                </p>
                <p className="text-gray-600 mt-4">
                  We are currently working on our comprehensive terms of use. This page will be updated soon with detailed information about the terms and conditions for using our website and services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
