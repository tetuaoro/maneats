import Head from "next/head"
import { email, sitename } from "@libs/app"

import type { NextPage } from "next"

const title = sitename + " - Conditions, Confidentialité & RGPD"

const Page: NextPage = () => {
  const siteName = "maneatahitiservices.pf"
  return (
    <main className="container py-5">
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{"Conditions, Confidentialité & RGPD"}</h1>
      <p>
        {`L’utilisation de ${siteName} est régie par les présentes conditions générales d’utilisation (CGU). Toute modification des CGU sera portée à la connaissance des utilisateurs du site. Cette information pourra également être accessible, le cas échéant, lors de la mise en œuvre des fonctionnalités proposées et via sa page facebook.`}
      </p>
      <section>
        <h2>Consulter attentivement les présentes CGU</h2>
        <p>{`Si vous ne souhaitez pas ou n’êtes pas habilité à accepter les présentes CGU, nous vous invitons à ne pas utiliser notre site. Pour toute question, n'hésitez pas à nous contacter à ${email}.`}</p>
        <h3>Article 1 : Objet</h3>
        <p>{`Les présentes CGU ou Conditions Générales d’Utilisation encadrent juridiquement l’utilisation des services du site ${siteName} (ci-après dénommé « le site »).`}</p>
        <p>{`Constituant le contrat entre la société ${siteName}, l’Utilisateur, l’accès au site doit être précédé de l’acceptation de ces CGU. L’accès à cette plateforme signifie l’acceptation des présentes CGU.`}</p>
        <h3>Article 2 : Mentions légales</h3>
        <p>{`L’édition du site ${siteName} est inscrite au RCS sous le numéro 091541A à Papeete, Tahiti, Polynésie Française.`}</p>
        <p>{`L’hébergeur du site ${siteName} est la société Vercel Inc, sise au 340 S Lemon Ave #4133, Walnut, CA 91789.`}</p>
        <h3>Article 3 : Accès au site</h3>
        <p>{`Le site est accessible gratuitement depuis n’importe où par tout utilisateur disposant d’un accès à Internet. Tous les frais nécessaires pour l’accès aux services (matériel informatique, connexion Internet…) sont à la charge de l’utilisateur.`}</p>
        <p>{`Pour des raisons de maintenance ou autres, l’accès au site peut être interrompu ou suspendu par l’éditeur sans préavis ni justification.`}</p>
        <h3>Article 4 : Collecte des données</h3>
        <p>{`Le site récolte uniquement votre nom complet et votre numéro de téléphone afin de vous servir au mieux.`}</p>
        <p>{`Suivant la loi Informatique et Libertés en date du 6 janvier 1978, articles 39 et 40, l’Utilisateur dispose du droit d’accéder, de rectifier, de supprimer et d’opposer ses données personnelles. L’exercice de ce droit s’effectue par mail.`}</p>
        <h3>Article 5 : Propriété intellectuelle</h3>
        <p>{`Les marques, logos ainsi que les contenus du site ${siteName} (illustrations graphiques, textes…) sont protégés par le Code de la propriété intellectuelle et par le droit d’auteur.`}</p>
        <p>{`La reproduction et la copie des contenus par l’Utilisateur requièrent une autorisation préalable du site. Dans ce cas, toute utilisation à des usages commerciaux ou à des fins publicitaires est proscrite.`}</p>
        <h3>Article 6 : Responsabilité</h3>
        <p>{`Le site décline toute responsabilité concernant les éventuels virus pouvant infecter le matériel informatique de l’Utilisateur après l’utilisation ou l’accès à ce site.`}</p>
        <p>{`Le site ne peut être tenu pour responsable en cas de force majeure ou du fait imprévisible et insurmontable d’un tiers.`}</p>
        <p>{`La garantie totale de la sécurité et la confidentialité des données n’est pas assurée par le site. Cependant, le site s’engage à mettre en œuvre toutes les méthodes requises pour le faire au mieux.`}</p>
        <h3>Article 7 : Liens hypertextes</h3>
        <p>{`Le site peut être constitué de liens hypertextes. En cliquant sur ces derniers, l’Utilisateur sortira de la plateforme. Cette dernière n’a pas de contrôle et ne peut pas être tenue responsable du contenu des pages web relatives à ces liens.`}</p>
        <h3>Article 8 : Cookies</h3>
        <p>{`Le site utilise un cookie (voir les confidentialités).`}</p>
        <h3>Article 9 : Durée du contrat</h3>
        <p>{`Le présent contrat est valable pour une durée indéterminée. Le début de l’utilisation des services du site marque l’application du contrat à l’égard de l’Utilisateur.`}</p>
        <h3>Article 10 : Droit applicable et juridiction compétente</h3>
        <p>{`Le présent contrat est soumis à la législation Polynésienne. L’absence de résolution à l’amiable des cas de litige entre les parties implique le recours aux tribunaux polynésiens compétents pour régler le contentieux.`}</p>
      </section>
      <section>
        <h2>Confidentialité</h2>
        <p>{`La confidentialité des visiteurs de notre site web est très importante à nos yeux, et nous nous engageons à la protéger. Cette politique détaille ce que nous faisons de vos informations personnelles.`}</p>
        <p>{`Consentir à notre utilisation de cookies en accord avec cette politique lors de votre première visite de notre site web nous permet d’utiliser des cookies à chaque fois que vous consultez notre site.`}</p>
        <h3>Collecte d’informations personnelles</h3>
        <p>{`Les types d’informations personnelles suivants peuvent collectés, stockés et utilisés : nom complet et numéro de téléphone.`}</p>
        <h3>Utilisation de vos informations personnelles</h3>
        <p>{`Les informations personnelles qui nous sont fournies par le biais de notre site web seront utilisées dans les objectifs décrits dans cette politique ou dans les pages du site pertinentes. Nous pouvons utiliser vos informations personnelles pour : vous contacter et vous envoyer votre devis/facture.`}</p>
        <h3>Divulgation de vos informations personnelles</h3>
        <p>{`Nous pouvons divulguer vos informations personnelles à n’importe lequel de nos employés, dirigeants, assureurs, conseillers professionnels, agents, fournisseurs, ou sous-traitants dans la mesure où cela est raisonnablement nécessaire aux fins énoncées dans cette politique.`}</p>
        <p>{`Nous pouvons divulguer vos informations personnelles à n’importe quel membre de notre groupe d’entreprises (cela signifie nos filiales, notre société holding ultime et toutes ses filiales) dans la mesure où cela est raisonnablement nécessaire aux fins énoncées dans cette politique.`}</p>
        <p>{`Nous pouvons divulguer vos informations personnelles : Dans la mesure où nous sommes tenus de le faire par la loi ; Dans le cadre de toute procédure judiciaire en cours ou à venir ; Pour établir, exercer ou défendre nos droits légaux (y compris fournir des informations à d’autres à des fins de prévention des fraudes et de réduction des risques de crédit) ; À l’acheteur (ou acheteur potentiel) de toute entreprise ou actif en notre possession que nous souhaitons (ou envisageons de) vendre ; et À toute personne que nous estimons raisonnablement faire partie intégrante d’un tribunal ou autre autorité compétente pour la divulgation de ces informations personnelles si, selon notre opinion, un tel tribunal ou une telle autorité serait susceptible de demander la divulgation de ces informations personnelles.`}</p>
        <p>{`Sauf disposition contraire de la présente politique, nous ne transmettrons pas vos informations personnelles à des tierces parties.`}</p>
        <h3>Conservation de vos informations personnelles</h3>
        <p>{`Vos données sont conservées pendant 1 ans à partir de la date à laquelle vos informations ont été stockées.`}</p>
        <h3>Sécurité de vos informations personnelles</h3>
        <p>{`Nous prendrons des précautions techniques et organisationnelles raisonnables pour empêcher la perte, l’abus ou l’altération de vos informations personnelle.`}</p>
        <p>{`Nous stockerons toutes les informations personnelles que vous nous fournissez sur des serveurs sécurisés (protégés par pare-feu).`}</p>
        <p>{`Vous reconnaissez que la transmission d’informations par internet est intrinsèquement non sécurisée, et que nous ne pouvons pas garantir la sécurité de vos données envoyées par internet.`}</p>
        <h3>Amendements</h3>
        <p>{`Nous pouvons parfois mettre cette politique à jour en publiant une nouvelle version sur notre site web. Vous devez vérifier cette page régulièrement pour vous assurer de prendre connaissance de tout changement effectué à cette politique. Nous pouvons vous informer des changements effectués à cette politique par courrier électronique ou par le biais de notre page facebook.`}</p>
        <h3>Vos droits</h3>
        <p>{`Vous pouvez nous demander de vous fournir toute information personnelle que nous détenons sur vous ; le transfert de telles informations sera soumis aux conditions suivantes : confirmation de votre identité.`}</p>
        <p>{`Nous pouvons retenir les informations personnelles que vous demandez dans la mesure autorisée par la loi.`}</p>
        <p>{`Vous pouvez nous demander à tout moment de ne pas traiter vos informations personnelles à des fins marketing.`}</p>
        <p>{`En pratique, vous exprimerez expressément et à l’avance votre accord pour que nous utilisions vos informations personnelles à des fins marketing ou nous vous fournirons une opportunité de refuser l’utilisation de vos informations personnelles à des fins marketing.`}</p>
        <h3>Cookies</h3>
        <p>{`Le seul cookie du site est la garantie que vous acceptez les présentes CGU, Confidentialité et RGPD. Il se nomme 'acceptcgu' et à une durée d'expiration de 180 jours.`}</p>
      </section>
      <section>
        <h2>RGPD</h2>
        <p>{`Le formulaire de devis utilise une case à cocher pour le rgpd.`}</p>
      </section>
    </main>
  )
}

export default Page
