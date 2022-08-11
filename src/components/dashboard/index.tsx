// import type { PropsWithChildren } from "react"
import { Alert, Container, Modal, Nav, Navbar, Offcanvas, Button } from "react-bootstrap"
import { RecoilRoot, useRecoilState } from "recoil"
import Link from "next/link"
import dynamic from "next/dynamic"
import { sitename } from "@libs/app"
import { modalAtomState } from "@libs/atoms"
import { logger } from "@libs/functions"

const NavbarOffcanvas = dynamic(() => import("react-bootstrap/NavbarOffcanvas"), { ssr: false })

const Navigation = () => {
  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="sm" collapseOnSelect className="vh-sm-100 align-items-sm-start">
      <Container fluid className="flex-sm-column">
        <Link href="/">
          <Navbar.Brand href="/" className="mb-sm-5">
            {sitename}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <NavbarOffcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel" className="fs-1">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-sm-column flex-grow-1 pe-3">
              <Nav.Link className="py-sm-3">Compte</Nav.Link>
              <Nav.Link className="py-sm-3">Services</Nav.Link>
              <Nav.Link className="py-sm-3">Devis/Factures</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </NavbarOffcanvas>
      </Container>
    </Navbar>
  )
}

const DashboardC = () => {
  const [{ text, variant, show }, setModalState] = useRecoilState(modalAtomState)

  const setModal = () => {
    setModalState({ show: !show, text: "test modal state 2", variant: "success", timeout: 1000 })
  }

  const onEnter = () => {
    const navbar: HTMLElement | null = document.querySelector(".navbar")
    if (navbar) {
      navbar.style.paddingRight = "0px"
      navbar.style.marginRight = "0px"
    }
  }

  return (
    <>
      <Modal show={show} backdrop={false} dialogClassName="fixed-bottom" onEnter={onEnter}>
        <Modal.Body className="p-0">
          <Alert className="m-0" variant={variant || "info"}>
            {text}
          </Alert>
        </Modal.Body>
      </Modal>
      <div className="d-sm-flex">
        <Navigation />
        <Container fluid className="my-3">
          <Button onClick={setModal}>Modal {show}</Button>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum recusandae at minus maiores eaque. Vitae soluta facilis, nihil repudiandae officiis sit ratione perferendis quidem dolore
            alias, sunt a voluptatibus reprehenderit? Illo inventore distinctio ratione officiis cum odio id accusamus possimus deserunt nulla architecto, officia repellat similique aut magnam facere
            atque, alias quam nihil reprehenderit asperiores temporibus voluptate mollitia? Asperiores, maxime? Ducimus dolores cumque at mollitia amet blanditiis repellat accusantium, totam
            cupiditate praesentium nobis nesciunt, doloremque sapiente eaque, nulla vitae expedita animi molestias! Sapiente accusantium totam, tempore incidunt dolorum neque corrupti! Vitae in odio
            culpa ipsam autem omnis maiores tempore iusto ratione odit nam molestias ducimus illo obcaecati nisi eaque, eum cupiditate! Vero impedit non soluta at recusandae maxime praesentium illo.
            Voluptatum est voluptas unde ipsa perspiciatis molestias. Obcaecati, pariatur fugiat quae illum rem totam, sed atque a eveniet consequatur similique voluptas voluptatem aut voluptatibus
            rerum sint est. Soluta, at ex? Beatae ad ipsum sunt, et iure architecto, iste dolor accusamus delectus vel voluptates esse expedita inventore, voluptatibus tenetur culpa veritatis
            temporibus minus. Aspernatur cupiditate, repellat nihil eos a eius. Dolorum. Consequatur ipsum unde voluptates exercitationem deserunt inventore sequi quia enim, voluptate maiores sit
            vitae eligendi maxime tempore, et qui voluptatibus doloremque quo rerum aspernatur neque. Culpa nulla at sunt dicta. Reiciendis blanditiis quasi vel! Mollitia, cum! Laudantium molestiae
            commodi alias perferendis hic exercitationem, reprehenderit repudiandae quae laborum voluptatum velit atque sunt suscipit doloribus nam vitae architecto libero ipsam nobis voluptas?
            Aperiam placeat est reprehenderit explicabo illo, sequi quis praesentium odio nostrum quisquam aliquam delectus esse itaque ad consequatur! Soluta nisi quasi sequi, ad corrupti itaque
            saepe error fugit vero nihil. Obcaecati reprehenderit illo eos sit, incidunt debitis, cumque odio optio eius eligendi aut sint saepe sunt? Ad, exercitationem perspiciatis. Illum veritatis
            earum, nobis facilis praesentium quae! Itaque non fuga nobis! Ipsa, quo magnam veniam maxime possimus cupiditate perspiciatis laborum nihil asperiores maiores voluptates assumenda,
            aperiam, voluptas dicta voluptatibus quasi similique cumque enim. Dolor, exercitationem. Provident porro consequuntur odio alias! Molestiae. Similique exercitationem enim non dolore atque
            eveniet blanditiis dolorem, consequuntur modi dolorum aliquid amet itaque consequatur minus quisquam nisi ex ipsum quia unde libero maxime quas iusto. Officia, ea nemo. Doloribus facilis
            odio, sed iusto itaque atque nostrum. Laudantium facere natus nihil eligendi impedit nesciunt at eveniet laborum a quidem! Autem facere excepturi fugit unde doloremque assumenda maiores
            dolorum obcaecati. Quod, dolores. Excepturi aperiam laborum deserunt ab dicta nostrum sapiente aliquid molestiae. Corporis eius non nulla adipisci earum. Fugit neque repellendus accusamus
            quae at beatae nemo saepe esse eius excepturi? Placeat sed, porro quaerat iure earum, laborum necessitatibus ducimus nobis, quibusdam sint recusandae odit dolorem officia asperiores
            reprehenderit non aliquam iste dolore quo! Totam minima, vitae maxime reprehenderit laborum facilis. Blanditiis saepe dolore et eius? Voluptates, cupiditate sunt ipsa laboriosam sequi iste
            in delectus iure dolorem, laudantium natus voluptatibus amet optio alias illo qui ea magni distinctio commodi eum. Beatae? Soluta error veritatis suscipit eaque tenetur reiciendis ipsum
            voluptate dignissimos eius adipisci vero praesentium non, quisquam optio voluptates, ipsam quasi atque, id labore facilis ratione? Cupiditate, esse? At, eos ducimus! Corporis alias nisi
            nostrum autem, reiciendis optio iste assumenda impedit, minus modi quis ratione unde nobis quam perspiciatis quisquam quidem saepe mollitia officia consequuntur. Reiciendis rem architecto
            veritatis adipisci perspiciatis. Quidem tenetur inventore expedita explicabo velit voluptas sit, adipisci nesciunt id, totam optio sed autem deleniti beatae fugit sapiente ullam molestiae!
            Perspiciatis rem vitae quasi quam quis veniam aliquid veritatis. Ducimus exercitationem illum, assumenda, officiis explicabo quae libero illo quam, numquam excepturi omnis natus nam quos
            harum blanditiis sapiente magnam porro. Recusandae voluptatibus facere quod numquam maxime! Consectetur, distinctio praesentium! Sapiente, vitae dolor. Exercitationem amet optio, numquam
            enim voluptatibus saepe libero explicabo dolorem sunt, molestias labore natus quisquam nesciunt voluptates ea facere iste, magnam nobis similique sint nam suscipit vel? Rerum ut labore
            dolore molestias obcaecati est quae unde voluptatem magnam, velit veritatis, eius iure doloremque minus reprehenderit nisi id incidunt distinctio fugiat deleniti consequatur accusantium.
            Est facere illum ut! Quo maiores quisquam blanditiis sapiente cumque. Nobis voluptate corporis, in, consectetur debitis optio eveniet quam deleniti incidunt reprehenderit tenetur ipsum a
            voluptatem vero facilis modi labore maiores quas. Ex, laboriosam. Similique sequi consequatur vitae optio numquam velit inventore provident id delectus beatae quas odio error distinctio et
            consectetur officiis sint nesciunt, quidem dolores fuga esse aliquid. Esse ut corrupti architecto! Repellat laborum labore dolores corporis similique fugit, aliquid quibusdam eligendi iure
            quasi ducimus explicabo dolorem tenetur architecto veritatis ab! Ullam enim similique numquam officia sint assumenda temporibus exercitationem dicta aspernatur. Soluta, voluptatem fugiat
            omnis nihil laboriosam, eligendi necessitatibus ea odit dolorum magni inventore velit nemo, et reiciendis sapiente veritatis deserunt quas repellat modi excepturi possimus minima mollitia
            at totam. Doloremque! Eligendi nihil voluptas incidunt veritatis ipsa assumenda labore consequatur quo, nesciunt accusamus voluptates adipisci quae autem obcaecati illo et officiis
            laudantium dolor amet nemo. Adipisci mollitia numquam assumenda dignissimos minus. Nulla delectus dignissimos, rem at magnam iusto dolor! Eius necessitatibus provident quo culpa. Hic
            cupiditate voluptatibus fugit earum magnam corporis blanditiis vitae numquam necessitatibus, voluptas neque fugiat placeat itaque beatae. Expedita eos incidunt vel aperiam officia omnis
            sapiente voluptates cum facere itaque rerum a et recusandae quod laborum alias nisi quas, id vero? Consequatur laboriosam eius corporis odit distinctio totam? Delectus, cupiditate odit.
            Similique quidem explicabo, qui, quia deserunt provident ratione ullam adipisci blanditiis modi eos perferendis tenetur ex vel exercitationem, saepe suscipit quis maxime? Nesciunt deserunt
            qui voluptatibus dolorum. Voluptates sequi minima deleniti nisi dolorum tempora aperiam! Esse explicabo mollitia dolorem veritatis accusamus, nulla qui dolore libero, quaerat temporibus
            totam cupiditate impedit error debitis ab ducimus deleniti sequi quam. Dolor delectus est reprehenderit beatae deserunt aliquid, nobis, itaque laborum, sequi voluptas nisi! Architecto,
            ipsum veritatis possimus qui quis saepe voluptates beatae in eum id, corrupti accusantium ab! Aliquam, minus! Quae adipisci dolores sunt alias neque sit quasi maiores deserunt assumenda
            facilis laudantium ratione fugiat debitis, quas totam, odit nulla rerum inventore unde. Beatae, odio officia reprehenderit possimus laudantium eius? Perspiciatis reprehenderit iusto eius
            ratione, soluta sapiente voluptatem animi corporis aspernatur quod minima expedita ipsum itaque incidunt est velit eaque assumenda dignissimos blanditiis quibusdam illo exercitationem
            cumque repellat? Officiis, ullam? Commodi ea, corporis dolores, culpa suscipit quaerat aliquam explicabo omnis delectus laudantium libero voluptates optio porro facilis nulla quasi.
            Laudantium fugiat aspernatur asperiores fuga sit non deserunt exercitationem recusandae minus. Dolor pariatur vero blanditiis et dolorum animi at nam recusandae libero vitae, itaque
            numquam magnam nostrum quo culpa ipsam officiis iste delectus quidem harum aut soluta eum repudiandae? Eaque, quo? Numquam, error facilis! Ut, quas maiores? Expedita labore deleniti
            consequuntur eveniet necessitatibus sit ducimus molestias doloribus velit laborum nulla, voluptatibus iste officia pariatur porro soluta illo sint incidunt veniam at. Possimus atque quasi
            nemo unde molestias iure totam id rerum cumque laudantium. Facilis praesentium tenetur voluptatem ipsum totam nihil aliquid iusto. Beatae quod porro placeat optio, dolor architecto dolores
            laudantium. Excepturi enim, saepe veritatis eos aut incidunt sed quas ipsa officiis tempore eveniet totam dolorum sequi at explicabo quidem quis commodi? Autem cumque ducimus, consequatur
            voluptatum voluptatem adipisci nobis recusandae. Exercitationem cupiditate provident illo reprehenderit animi labore vero itaque aliquid error quasi in laudantium quae culpa, architecto,
            nam veniam ullam ducimus dignissimos dolor ipsum facere vitae ab. Est, numquam nesciunt. Tempore non architecto a nam quia necessitatibus, fugit sint ipsum sed animi labore excepturi
            inventore id, eius rerum praesentium voluptatibus aliquid nobis placeat quod ullam? Dolore enim corporis at qui. Iure, enim quia. Recusandae fugiat earum quibusdam. Necessitatibus
            repellendus odit sit ratione debitis neque eaque facilis deleniti maxime in dignissimos recusandae consequatur ex similique distinctio laborum iure enim, placeat quaerat! Laborum nobis
            quisquam dignissimos dolor, inventore nisi atque obcaecati tenetur voluptas, sunt autem sed cum animi. Quibusdam dolorum temporibus ipsum magnam aliquid tempora! Suscipit ipsam ex natus
            sit esse dolor. Repellendus quidem facere exercitationem consequatur quis dolorum laborum magnam earum velit culpa, modi vel nihil non quo, aliquid doloremque deserunt esse? Quae sequi
            esse laboriosam reprehenderit voluptatibus facilis consectetur quibusdam? Quibusdam voluptate at aspernatur inventore dignissimos? Reiciendis, magni est? Magni obcaecati ratione est?
            Corporis impedit illum quis autem debitis, qui fugiat perferendis animi earum numquam quas officiis. Aspernatur, laborum minus! Rerum nisi nemo officiis sed, velit atque sint iure
            quibusdam ea, excepturi beatae dolor nesciunt. Iusto, eius. Odit quae adipisci pariatur voluptate fugiat nulla vero, aliquam, praesentium quia tenetur aspernatur? Amet sunt eligendi aut
            perferendis quidem sapiente dignissimos molestiae repellat eveniet est ullam ducimus impedit labore adipisci veritatis harum, incidunt velit ratione. Odit quo laudantium dolore? Voluptates
            impedit inventore delectus? Facilis, omnis eaque impedit excepturi cupiditate delectus porro sapiente repudiandae quidem qui iusto deserunt ullam, mollitia perspiciatis natus rerum ratione
            esse? Molestiae unde explicabo eius atque debitis illum, maiores rerum. Dolores natus culpa aut officia, aspernatur voluptatibus adipisci placeat pariatur exercitationem excepturi
            inventore repellat explicabo eos alias ipsum consectetur voluptatum commodi officiis qui repudiandae earum quod itaque. Voluptatem, deserunt suscipit? Fuga quae illum autem aliquid!
            Similique minus nam et ut odit laboriosam tempore eligendi aperiam iusto sint, delectus at! Quos animi sequi modi explicabo quod est ipsa cumque voluptate nobis? Ipsam tempore ullam
            impedit deleniti quo dolorum quibusdam eaque excepturi molestiae? Labore, odit quas. Expedita maiores modi fuga ipsam, debitis fugiat blanditiis corrupti! Natus perspiciatis, vitae et
            voluptatibus id autem. Quo ut eius repellendus alias ab eveniet quia rem autem sequi minima saepe inventore laudantium, aliquam omnis ea consequatur minus voluptatum repellat obcaecati
            error adipisci totam exercitationem quaerat! Cum, laboriosam! Maxime dolore aspernatur quis cumque recusandae facilis dignissimos obcaecati quod ullam similique quas provident libero
            delectus eum fugit cupiditate rem distinctio optio, saepe nam perferendis voluptatibus molestias pariatur repudiandae. Quidem? Rerum molestiae dolore modi tenetur laboriosam sint obcaecati
            officia iure eum! Et ducimus tempore culpa. Consectetur quidem id porro commodi, pariatur soluta facere assumenda, ex ea repellat quae, voluptatem optio! Omnis at ea aliquam magni
            explicabo? Voluptate cupiditate nobis consequatur possimus illum nostrum illo, nam, quae dolore, minus commodi maxime fugiat consectetur. Distinctio illum ipsum atque, voluptates quis
            autem quaerat! Magnam nam, temporibus corrupti nostrum voluptatibus et eveniet aspernatur repellat! Soluta incidunt dolores ut labore nisi, sit corporis eum a. Inventore voluptatum tempora
            harum dignissimos magni, minus maxime. Ipsa, qui. Id nam facere amet ab dicta dolor reprehenderit labore veniam esse laudantium ea ex voluptate, totam eum? Rerum expedita modi illo sequi
            consequatur voluptatem deserunt? Veniam mollitia autem similique sed. Eligendi fugit ab dolore aut magnam reprehenderit doloremque. Amet tenetur alias velit ipsum aspernatur distinctio,
            recusandae, incidunt culpa, perferendis blanditiis odit nostrum similique? Sint eveniet atque quis repudiandae, autem corrupti. Quo id numquam dolorum? Cumque adipisci saepe reiciendis!
            Vel ea atque ratione sapiente repudiandae perspiciatis mollitia, aperiam nostrum incidunt blanditiis praesentium velit quas sint aliquam earum quae doloremque autem illo? Quia sed earum
            eos consequatur repudiandae! Ratione corporis iure ut vitae hic veniam quos aliquid, tenetur exercitationem odio sequi accusamus in eos voluptatem maxime aspernatur sit animi. Veritatis,
            quos numquam? Expedita sapiente sunt accusamus cumque iusto, officia in atque autem ipsa minus laudantium animi rem voluptates rerum cupiditate dolore ipsam, repudiandae voluptate eveniet
            illum at nobis! Hic iure tempore aperiam. Distinctio cupiditate placeat, expedita, aut magni laborum tempore, hic corporis totam amet quos eius laboriosam sit itaque laudantium id nisi
            recusandae tempora ut? Nulla facilis soluta quidem eveniet expedita atque? Maxime, deserunt similique consequuntur earum, dolorum blanditiis voluptatem nostrum unde obcaecati molestias
            animi iste laborum odio quaerat nesciunt voluptatum quam voluptas dolor quos? Sint harum quasi vitae? Sequi, inventore debitis. Est, ducimus. Laudantium, tenetur impedit. Obcaecati eum, ad
            libero tenetur eaque accusamus ut fugit odit aspernatur cum harum unde dolor pariatur qui? Magnam unde expedita illo minima pariatur alias rem. Vero vel voluptatem inventore esse alias
            animi obcaecati quibusdam, maiores eum voluptas beatae? Voluptas, corporis! Pariatur dolorum accusantium nihil doloremque blanditiis placeat inventore soluta nam laborum in! Ab, modi
            adipisci? Voluptatum amet ex dolor voluptates sequi consectetur ab placeat vero, ratione architecto modi adipisci unde in porro quidem rem quia quisquam illum cum. Nemo harum dignissimos,
            vero sequi eligendi nisi? Officia fugit ullam quas optio voluptatum obcaecati praesentium, asperiores maiores vero doloremque voluptatibus, velit nisi aliquam dolore aut, quidem tenetur
            debitis? Quam eveniet a nihil fugiat modi, est consectetur officiis! Ullam error iste non sed. Autem nostrum esse quisquam mollitia aspernatur, iure magni exercitationem dolor aperiam
            laudantium quas consequuntur! Ex nihil iste commodi repellat voluptatibus consequatur rem debitis ab amet. Possimus facilis quas, eum ullam nihil totam quibusdam repudiandae nobis deleniti
            mollitia aliquid architecto ut, laudantium, rem quos aperiam vitae vero est in quod fuga? Illum quia iusto impedit vitae. Dignissimos natus, atque quis alias nobis ab quam repellendus!
            Nobis exercitationem eius fugiat sunt beatae. Illo voluptates veniam tempora, numquam similique quaerat animi ea asperiores eligendi eveniet aut doloribus nemo! Officiis ipsam magni
            doloribus sapiente quibusdam voluptates praesentium quod iste perferendis. Inventore neque illum, sapiente velit beatae ipsam ea at cumque deserunt repudiandae dicta dignissimos quasi!
            Itaque cum sit accusantium? Reiciendis deleniti tenetur repudiandae doloribus quia cupiditate accusantium ad laboriosam? Impedit eveniet molestiae pariatur quaerat vitae ipsam explicabo
            ducimus, corrupti quam distinctio at vero inventore, cupiditate dolor rerum reiciendis sit! Esse tempora itaque magni commodi explicabo reiciendis voluptatibus qui tempore magnam delectus
            necessitatibus optio nemo quod aperiam, suscipit, modi accusamus sunt nobis eum harum facilis veritatis. Qui, cum. Nam, voluptas! Nemo, eaque. Impedit nobis, quibusdam perferendis
            exercitationem cumque consequatur accusamus adipisci vitae dolorum. Magnam repudiandae nostrum recusandae. Animi repudiandae aut, non distinctio, assumenda quae et voluptate error nostrum
            ratione debitis? Maxime autem officia voluptas sequi sapiente quisquam tenetur, maiores dignissimos molestias id, earum beatae, accusamus animi ipsum vero omnis similique quas facere
            distinctio illo necessitatibus inventore placeat voluptatum! Sed, quis! Excepturi molestiae alias magnam, impedit dolorem laudantium nihil illum placeat dignissimos debitis voluptatum
            facere quidem! Beatae, odit. Magni laborum at sint eius obcaecati qui, labore similique maxime omnis molestias esse! Architecto fugit, iusto, culpa iure sit error porro beatae sequi
            voluptatem soluta possimus iste, laudantium eligendi ad officiis natus repellat quibusdam dolorem explicabo deserunt ab aliquam. Laboriosam qui vitae impedit. Aliquid placeat molestiae,
            quis suscipit debitis magni sit quam aut consequatur consequuntur, sequi doloremque tempora corrupti molestias. Odio obcaecati temporibus adipisci consequuntur omnis repudiandae illo ab
            corrupti quia magnam! Reprehenderit. Magni quam atque excepturi nam, dicta vitae neque similique expedita laudantium beatae! Labore animi recusandae dolor molestias sint omnis quam
            assumenda, ipsum dolores earum, quod minima iure obcaecati fugiat deleniti? Facilis inventore facere nostrum officia quasi, nobis doloremque, alias non quod delectus beatae! Dolorum
            reiciendis quo at consectetur, suscipit culpa adipisci totam? Molestiae ad porro quidem aliquid sit soluta. Aperiam. Rerum vero, ducimus odio totam consectetur eos similique, error harum
            voluptates adipisci tempore corporis exercitationem repellendus tenetur odit earum blanditiis nisi nemo vel beatae suscipit. Nam corporis neque eligendi? Minima. Impedit aspernatur
            repellat tempora, illum libero debitis odio nulla explicabo quos eum, dolores ipsa ex reiciendis repudiandae asperiores illo quibusdam, laudantium aperiam! Animi rerum excepturi tempora
            deserunt harum aperiam sint! Eos, vel corporis, vitae repudiandae esse blanditiis rerum ut accusantium quisquam ab voluptas labore doloribus quis nesciunt enim repellendus at, quam dicta
            quasi architecto. Obcaecati enim error fuga reprehenderit sed. Deserunt repellat magni veritatis maxime harum maiores. Cum, sapiente vel itaque soluta at nisi ipsam sint vero voluptatem
            blanditiis reiciendis accusamus quidem quis odit assumenda fugit quaerat ex velit alias! Ipsam, odit ab facilis impedit itaque rerum a esse est eveniet alias temporibus totam aut rem
            commodi ipsum harum dolorem amet consectetur quas ullam sit delectus! Quod animi quasi molestias! Nostrum quibusdam porro quidem eligendi repellat inventore at rem amet doloribus modi
            laudantium possimus incidunt libero saepe harum sed quaerat, eveniet, neque corrupti alias esse iusto! Quos magni quae nisi. Aliquam, fugiat impedit dicta inventore dolorum vel, ipsam
            aspernatur alias voluptatem porro repellat magnam facilis nesciunt vitae sunt deleniti in. Hic excepturi ex error reprehenderit libero tempore eos nobis fuga. Expedita itaque perferendis
            sapiente excepturi cum reprehenderit voluptates, exercitationem facilis ipsum hic inventore nostrum id architecto soluta? Ipsum obcaecati sequi ducimus, optio natus dolorum ullam nostrum
            maxime eligendi facere cumque! Dolorum nesciunt voluptatibus adipisci maxime error consequuntur, id modi voluptatem recusandae quidem eveniet accusantium dolorem ad et impedit a enim
            cumque provident vel pariatur voluptatum. Veniam delectus doloremque iusto sequi. Eligendi distinctio, ex cum inventore molestias alias nemo eos, facere nam mollitia nostrum ipsam
            reprehenderit ratione asperiores autem facilis omnis? Quisquam placeat harum dolores iusto voluptatem laudantium quo laborum fuga? Quas magni eius aliquid illum, necessitatibus cumque
            voluptatibus iste est porro nihil modi repudiandae officiis alias quo commodi reiciendis velit rem nostrum nulla ratione nisi accusantium pariatur! Minus, et dolorum. Commodi dolorum
            distinctio atque at iure quos optio sed quam quis. Soluta nesciunt nisi necessitatibus quisquam dolor assumenda libero consequuntur dolore in voluptates dolorum, optio, neque temporibus
            unde nemo iusto! Corrupti eos inventore deserunt, quod architecto rerum delectus natus iusto animi provident nam asperiores necessitatibus eligendi hic explicabo tempora tenetur et velit
            voluptate quia exercitationem obcaecati soluta! Omnis, molestiae deserunt. Ratione eligendi ea vel nesciunt! Commodi, ut fugiat sequi pariatur veniam ipsum iusto deleniti debitis minima
            tempora totam! Velit ea consequatur a quis beatae, dolorum quasi molestiae cumque dignissimos deleniti. Excepturi exercitationem voluptatum dicta non at tempore. Autem iusto adipisci eos
            officiis neque consequatur. Sint nisi esse assumenda rerum similique non, pariatur quam hic et culpa laudantium deserunt officiis minima! Quae esse quaerat repellendus amet odit nobis
            nulla natus enim corporis hic repellat facere debitis pariatur eveniet error est recusandae sunt vel libero consequuntur quibusdam mollitia, velit suscipit veritatis! Vitae. Eaque cumque
            quae esse quam incidunt sapiente maxime, officia, quod iure quas doloribus harum aut deleniti culpa? Accusantium voluptas libero accusamus in illum, quod dolor, dolorum porro, corrupti
            architecto similique? Magnam veritatis assumenda qui impedit iusto ut accusamus, corrupti quaerat voluptate! Sed quod quo iure accusantium cupiditate possimus sapiente totam labore eum. Ab
            possimus vitae eum quae, aspernatur laborum nobis. Impedit quia placeat nemo cum quae doloribus ullam cupiditate, porro itaque aut voluptatem reprehenderit possimus velit mollitia voluptas
            hic tempore, nam aperiam veniam. Obcaecati accusamus itaque dolore distinctio iure illum! Obcaecati aliquid provident rem, consequuntur quam eveniet pariatur fuga, maiores iste beatae hic
            maxime laboriosam saepe harum sunt repellendus esse est deleniti? Delectus nesciunt similique minus molestias natus, quod quaerat. Labore blanditiis architecto itaque, mollitia vel beatae,
            praesentium facere, vero aliquam natus at! Praesentium quam at, animi unde sed rerum omnis distinctio a iste mollitia saepe numquam recusandae, eius quibusdam. Aliquam perferendis facere
            maxime dolor fuga praesentium fugiat. Eum hic laborum delectus. Hic nulla molestias odit, eos architecto distinctio quidem, mollitia dolore atque laudantium, harum aut velit praesentium?
            Quibusdam, nulla. Nisi cum laboriosam earum mollitia fugit modi, aliquid assumenda! Laboriosam pariatur dolorum veniam dignissimos sed, adipisci atque sit eius, quidem praesentium rem
            totam quis cumque necessitatibus harum qui itaque quae. Tempore ipsa delectus temporibus sunt, beatae et eligendi laudantium aliquam? Rerum deserunt, soluta reiciendis veniam assumenda in.
            Quia eveniet iusto, asperiores, laudantium eum suscipit quae quibusdam doloribus quis quam assumenda? Nemo, veniam dolor aliquid minus adipisci numquam non ipsa blanditiis perferendis quos
            ullam fugit, eaque aut ratione, magnam aspernatur neque velit. Voluptas iste ipsam a. Consectetur, deleniti perferendis. Adipisci, in! Unde cum atque laboriosam nam facilis vitae, debitis
            veritatis! Exercitationem reprehenderit voluptatem debitis, doloremque impedit blanditiis, dignissimos maxime consequuntur corporis ullam nobis. Ratione tempore quia ex est. Quo, assumenda
            dolorum. Omnis vero ut cum officia! Quae perspiciatis repellendus aspernatur omnis dignissimos placeat eos nesciunt hic ipsa similique. Veniam incidunt facere, ducimus corrupti quas
            doloribus voluptatem magnam molestias magni, omnis natus? At dolores sit corporis. Mollitia quisquam doloribus architecto maxime illo fugiat, adipisci ipsam repellendus perferendis, est
            praesentium quod dolore, dicta excepturi pariatur aspernatur eveniet nobis in unde accusantium velit sint! Asperiores fugiat eligendi unde quae voluptates corrupti, quis iure itaque
            reprehenderit sequi recusandae rerum repudiandae tempore sed soluta molestiae eveniet nisi neque? Delectus laboriosam veritatis possimus dicta error. Qui, doloremque. Debitis consequatur
            esse nesciunt, officiis earum enim ratione voluptates ullam impedit? Ullam beatae architecto corrupti explicabo. Corporis ut maiores, doloribus labore, soluta sed obcaecati nisi suscipit
            ab quam deleniti. Iste. Unde voluptatum illum quos. Officiis incidunt eveniet quaerat tempore delectus magnam nostrum, dignissimos velit, aliquid veniam corrupti mollitia praesentium
            dolore obcaecati id, nesciunt earum alias sint vel facere eum blanditiis? Alias esse sequi fuga quaerat maxime ab earum ad doloremque, non nisi cumque laudantium commodi ipsam error
            impedit eius inventore minus assumenda ut similique id excepturi? Quod magnam perferendis iste? Ratione corrupti accusamus veniam tempora quod vel natus quia quas laboriosam. Dolor
            adipisci dolorem rerum quis ea aspernatur? Deserunt iste ab similique nam ut commodi delectus laudantium suscipit recusandae. Officiis. Quaerat natus incidunt quod sint quisquam quam
            officia perspiciatis, perferendis consequuntur iure aliquid sed fuga officiis ipsam quasi esse nam assumenda soluta magnam cum voluptate, adipisci vero quas sapiente? Commodi! Repellat,
            quia eveniet! Similique laboriosam recusandae, error eos amet culpa maiores voluptate assumenda ab cumque hic dolor corrupti placeat adipisci fuga minima temporibus unde omnis reiciendis
            porro odio repudiandae nostrum. Tempora fugiat, ipsa tenetur dolorem dolorum dicta alias maxime eum similique, natus debitis esse vero voluptatibus obcaecati nam quia vitae ex magni ipsum!
            Quas quam doloremque, quae illo molestias eum. Eligendi, commodi excepturi sunt impedit architecto illo odio qui repellendus, quaerat ea aliquid cupiditate, tenetur similique laudantium.
            Accusamus et unde fugiat, doloribus deserunt ut delectus perspiciatis dolor expedita reiciendis nemo. Blanditiis, quas in maxime, iure officiis obcaecati iste ipsum earum consequatur
            labore sequi maiores fugiat doloremque dolore cum! Temporibus maiores nisi accusantium harum eum assumenda ipsum incidunt enim aliquid ducimus. Maxime nulla nisi, corporis eos quaerat
            eveniet iusto ab, repudiandae provident modi soluta quia culpa vitae odit nam, aliquam nemo ducimus ad et? Deleniti tempora a, earum vel dolorum laudantium. Quibusdam aliquid quae rem
            nulla quod alias necessitatibus obcaecati facilis magni tempora harum quam cum vel ratione inventore, nihil veritatis atque optio fugit eos consequatur dolorem, sit ducimus. Sit,
            exercitationem. Dolorum officiis, voluptatibus atque id perspiciatis pariatur! Sint temporibus quas sed eius magnam delectus voluptatem tempora incidunt itaque obcaecati repellat inventore
            similique, iste consectetur blanditiis facilis veniam accusantium laudantium id! Qui hic, maxime velit veritatis, omnis soluta labore eos, unde odio maiores expedita eveniet facere
            adipisci cupiditate est sequi distinctio excepturi iure accusantium dolor explicabo nesciunt reiciendis ipsum. Explicabo, hic! Tenetur quo officia aspernatur in natus reprehenderit dolor,
            dolore quam animi ullam exercitationem, maxime amet rem, fugit delectus minima distinctio qui enim odit. Quia saepe quam aspernatur consequuntur eaque cumque. Velit quasi deleniti natus
            numquam ducimus corrupti magnam. Vitae deserunt ea quia deleniti recusandae accusamus pariatur nesciunt, natus corrupti, nemo aliquam expedita consequatur aspernatur perferendis porro
            ducimus. Atque, magni maiores. Non nihil hic et ipsam! Molestias doloremque quo, voluptas laborum repellendus ratione omnis maxime deserunt rem magnam sed, quidem officia nulla mollitia
            cum quibusdam, alias corrupti repellat dignissimos saepe labore? Asperiores, id reiciendis. Quam ratione ea eligendi officiis molestias, non vel sequi veritatis error voluptatem ducimus?
            Sed maiores vero exercitationem voluptatibus, dolor illum magni harum veniam quo hic? Exercitationem, molestias! Nulla saepe eveniet dicta molestias odit atque est, blanditiis suscipit
            quos neque similique totam optio iste earum quis distinctio eius. Nemo, dicta voluptas! Itaque modi ea quis autem quas maxime. Eius pariatur perferendis delectus sapiente eos ipsum,
            repellat enim sed molestias amet, in ratione eligendi accusantium officia veritatis magnam aliquid dolore placeat? Temporibus minima beatae quae ducimus animi accusantium? Quam! Obcaecati
            dolorum quos voluptates deserunt officia accusamus voluptas corrupti aspernatur nam. Est deserunt ea optio dolorum repellendus tempore porro vero, expedita labore. Dolorem quas quis totam
            velit earum, inventore ea? Labore, voluptas. Sed, eum laborum exercitationem sunt, accusamus ea in laboriosam optio dolorum ex praesentium, voluptatum ad qui aut nulla odio vitae. Iure
            esse aperiam sapiente sequi fuga placeat magni. Et eius consectetur odio obcaecati veniam numquam sit perspiciatis fugit ullam deleniti. Distinctio molestiae ducimus esse. Temporibus sequi
            inventore tenetur, voluptas quisquam quis, vero recusandae quam voluptatibus, quod fugit consequuntur. Illo vitae totam non architecto omnis molestiae fugit animi repudiandae facilis
            reprehenderit voluptatibus quam dicta, esse ut tempora, ex sit sunt ipsum voluptas. Sit laborum quod praesentium a eveniet tenetur. Officiis accusamus placeat odit provident, dignissimos,
            nisi eligendi quidem laboriosam quos veritatis soluta cumque. Numquam, aliquam aperiam! Officia eius tempora, voluptatem ducimus fugit aliquid deserunt veniam. Quas, doloribus? Maiores,
            consequuntur? At quae harum laborum unde a corrupti facere tenetur minus quia, inventore iure assumenda possimus. Dignissimos recusandae adipisci voluptate, nesciunt numquam perspiciatis,
            optio quas deleniti, repellendus ratione dolor dolorum ipsa. Blanditiis odio quia, optio fugit placeat dolorem tenetur atque voluptatum ab suscipit inventore excepturi ullam minima?
            Laborum, exercitationem, quos ea et voluptatibus itaque ipsa sed repudiandae provident pariatur cumque dolores. Quod similique rerum autem eos quasi delectus aperiam facilis pariatur modi
            sed quaerat numquam assumenda officiis laborum culpa asperiores fugiat, vel beatae rem aliquam odit. Dolorum voluptate nesciunt sapiente veritatis. Ut beatae magni ipsa in provident
            aliquid pariatur explicabo quas. Suscipit inventore aperiam repudiandae vero voluptatibus et culpa molestiae velit, ratione earum eum ut at iure doloribus beatae eveniet dignissimos.
            Alias, eaque, dolorem voluptatum adipisci omnis optio illum ratione officia aspernatur quia animi repellendus delectus voluptates et tempora cumque earum. Debitis esse nesciunt magnam,
            alias facere libero dolor sunt totam! Deserunt, velit, voluptatem voluptatibus consequuntur enim nesciunt corporis totam modi a, culpa rem. Facilis, eum, ipsum, reprehenderit perferendis
            nesciunt ut sequi explicabo cumque debitis dignissimos autem! Eveniet earum quo dolor. Minima possimus perspiciatis in. Iure eveniet impedit ex totam inventore tenetur, error sed quibusdam
            eligendi, nulla voluptatibus natus ea assumenda voluptate explicabo, velit dolorem placeat adipisci numquam debitis mollitia nostrum. Modi minima facere accusamus possimus voluptatum
            veritatis, aut tenetur quidem amet autem temporibus reiciendis, odio nemo sequi ipsam cumque perspiciatis quam officia unde. Quae praesentium aspernatur voluptatibus, hic error a! Debitis,
            labore nobis pariatur facilis fugiat quas. Minima eum fugit quod, perspiciatis tenetur soluta officiis dolorem doloribus ratione earum, repudiandae ipsam reiciendis est expedita sapiente,
            eos alias inventore consequatur blanditiis. Vitae, autem quo ratione esse voluptates ipsum quod totam iusto eligendi amet repellat laborum quos enim? Ducimus possimus, incidunt odit cumque
            saepe modi fugit, dolores eos tempora nam, illum repudiandae! Minima nihil, quam nesciunt maxime hic reiciendis cupiditate repellendus, incidunt voluptates maiores quod rerum, velit
            itaque! Nobis laboriosam aut nostrum nam exercitationem facere adipisci odio laborum. Unde nam delectus possimus. Expedita quasi culpa nostrum, reprehenderit magnam recusandae fugit omnis
            natus at quos autem ad sint architecto nulla voluptate rerum, adipisci placeat magni, doloremque soluta! Cupiditate recusandae est officia laudantium! Quam. Quod dicta, iste quibusdam
            veritatis explicabo ipsum voluptatibus illum quo aut quidem dolores id possimus magni exercitationem qui hic impedit error? Cum minima laudantium natus. Alias minima nulla saepe impedit?
            Modi ducimus commodi voluptatibus maiores cupiditate voluptates quia eveniet ipsam laudantium nulla magnam assumenda quidem minima, quo optio voluptate suscipit aut harum dolorem obcaecati
            id itaque! Molestiae, ducimus? Architecto, a! Accusamus possimus rem, itaque adipisci suscipit nemo eius, impedit quam consequuntur hic eligendi natus voluptatem ex illo quibusdam aliquid
            molestiae nihil repudiandae? Tempora deleniti exercitationem ipsam vero aspernatur suscipit officiis. Assumenda nostrum, doloremque earum voluptatum et ipsa consequuntur consectetur
            blanditiis quasi tenetur id nesciunt. Minima laboriosam perspiciatis architecto temporibus, tempora nesciunt fuga facilis, illo deserunt ducimus, quaerat ad natus veritatis! Eum accusamus
            incidunt enim, numquam, sed quaerat aliquam nam doloremque, adipisci sequi saepe quas alias? Fugiat, veritatis porro! Alias ipsam illo tenetur fuga excepturi natus deleniti deserunt
            nesciunt rem dolores. Nesciunt aliquid expedita quo laboriosam ratione temporibus iusto id, odit quam ducimus illum consequuntur atque quisquam minus a nemo doloribus! Similique deleniti
            eum maiores ea praesentium itaque repudiandae rem consectetur. Soluta illum molestias voluptatum iusto cum? Quas, obcaecati? Blanditiis et consectetur quos recusandae magni non. Sapiente
            quam animi quae. Doloremque officiis explicabo quidem repellendus voluptas ab molestiae voluptatibus nulla consequuntur. Molestias veniam non aliquid sit doloribus porro rerum cupiditate,
            nam eligendi voluptas? Possimus eligendi repellat nesciunt sunt eius? Harum ad commodi eos delectus molestiae recusandae nemo praesentium, tempora enim itaque! Facere voluptatem, iure
            eaque doloremque enim sed fuga a recusandae alias, voluptatibus reprehenderit placeat dignissimos, doloribus quisquam numquam consectetur expedita vero! Laboriosam officia quod incidunt
            libero ab tenetur eligendi adipisci! At ut nesciunt a. Assumenda, vel tempora! Id nobis earum atque repellendus illo, ab quo minus. Harum illum facere sed alias doloremque officia, id
            error ipsa aliquid ducimus sunt aspernatur! Dolorum nisi omnis possimus sit voluptatem maxime, numquam corporis exercitationem modi laborum aliquid quasi doloribus reiciendis obcaecati
            asperiores. Laborum, explicabo autem. Ut rerum atque dolore optio possimus rem ea voluptates. Ipsum, veniam distinctio itaque recusandae et modi ut alias eius? Dolores blanditiis magni
            ipsum vitae molestiae officiis omnis debitis, vel aspernatur laboriosam harum pariatur consectetur beatae, itaque inventore velit. Illum. Veritatis voluptates autem, accusantium rem dicta
            labore mollitia, amet error nesciunt ducimus, id excepturi repellendus dolorum totam! Est, cumque. Unde magni voluptatibus molestias voluptate earum est ipsa rem optio sunt! Modi ducimus
            suscipit nisi quibusdam distinctio architecto impedit fugit consequuntur magni. Illo ad tempora possimus reprehenderit voluptate quas reiciendis labore suscipit hic impedit autem quia
            laboriosam optio, perferendis laborum totam. Tempore aliquam expedita vitae iste laborum voluptas recusandae dolore perspiciatis consequatur commodi maxime ducimus eum fugiat quis, ipsa
            doloremque quod non, pariatur eos. Architecto sapiente expedita eaque molestiae dolores. Quisquam?
          </p>
        </Container>
      </div>
    </>
  )
}

const Dashboard = () => {
  return (
    <RecoilRoot>
      <DashboardC />
    </RecoilRoot>
  )
}

export default Dashboard
