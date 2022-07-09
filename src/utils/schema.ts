import { WithContext, PostalAddress, OpeningHoursSpecification, AggregateRating, LocalBusiness } from "schema-dts"
import { sitename, siteurl, telephone, description, sameAs } from "./siteinfos"

const address: PostalAddress = {
  "@type": "PostalAddress",
  addressLocality: "Puna'auia",
  postalCode: "98718",
  streetAddress: "Puna'auia, Polynésie française",
  addressCountry: "PF",
  addressRegion: "Puna'auia",
}

const openingHoursSpecification: OpeningHoursSpecification = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  opens: "06:30:00",
  closes: "15:30:00",
}

const aggregateRating: AggregateRating = {
  "@type": "AggregateRating",
  ratingValue: 4,
  bestRating: 5,
  ratingCount: 3,
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
  logo: `${siteurl}/images/logo.png`,
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
