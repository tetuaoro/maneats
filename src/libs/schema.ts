import { WithContext, PostalAddress, OpeningHoursSpecification, AggregateRating, LocalBusiness } from "schema-dts"
import { sitename, siteurl, telephone, description, sameAs } from "@libs/app"

const address: PostalAddress = {
  "@type": "PostalAddress",
  addressLocality: "Papeete",
  postalCode: "98713",
  streetAddress: "Papeete, Polynésie française",
  addressCountry: "PF",
  addressRegion: "Papeete",
}

const openingHoursSpecification: OpeningHoursSpecification = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  opens: "06:00:00",
  closes: "16:00:00",
}

const aggregateRating: AggregateRating = {
  "@type": "AggregateRating",
  ratingValue: 4,
  bestRating: 5,
  ratingCount: 1,
}

const organization: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  address,
  aggregateRating,
  telephone,
  sameAs,
  description,
  url: siteurl,
  logo: `${siteurl}/icons/android_x144.png`,
  name: sitename,
  image: [`${siteurl}/images/couverture.png`],
  priceRange: "€€€",
  openingHoursSpecification: [
    {
      ...openingHoursSpecification,
    },
    {
      ...openingHoursSpecification,
      dayOfWeek: "Friday",
      closes: "12:00:00",
    },
  ],
}

export default organization
