import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui";
import { Accordion, type QA } from "@/components/accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes sur Stroke Action AVC : adhésion, soutien, gouvernance, contact.",
};

const QAS: QA[] = [
  {
    q: "Qu'est-ce que Stroke Action ?",
    a: "Stroke Action (Action AVC en français) est une organisation à but non lucratif basée au Cameroun. Sa mission : réduire le fardeau de l'AVC par l'éducation du public, la recherche scientifique, la formation professionnelle et le soutien aux patients et à leurs familles.",
  },
  {
    q: "Comment soutenir Stroke Action ?",
    a: "Plusieurs manières : faire un don en ligne via notre lien sécurisé (bientôt), devenir membre en soumettant une demande d'adhésion, donner de votre temps comme bénévole, relayer nos messages sur les réseaux sociaux, ou acheter nos produits (autocollants, livre — bientôt).",
  },
  {
    q: "Comment devenir membre de Stroke Action ?",
    a: "Soumettez une demande via le formulaire « Devenir membre » de notre site. Une fois votre candidature examinée et approuvée par le bureau exécutif, vous recevrez une lettre de confirmation. L'adhésion est ouverte à toute personne partageant nos valeurs.",
  },
  {
    q: "Comment régler ma cotisation ?",
    a: "Le virement bancaire est le moyen privilégié, pour la traçabilité et l'audit. Nous acceptons aussi les paiements via Mobile Money (MTN MoMo, Orange Money) : dans ce cas, générez un justificatif PDF et transmettez-le par e-mail, WhatsApp ou via le formulaire de contact.",
  },
  {
    q: "Quand se tient la prochaine assemblée générale ?",
    a: "Les dates des assemblées générales sont communiquées aux membres par e-mail et sur les réseaux sociaux. Suivez-nous et consultez régulièrement cette page.",
  },
  {
    q: "Stroke Action fournit-elle des soins médicaux ?",
    a: "Non. Stroke Action n'est pas un établissement de santé et ne fournit ni soins, ni diagnostics, ni prescriptions. En cas d'AVC, appelez immédiatement les secours. Au Cameroun : SAMU 119, Pompiers 118, Police 117.",
  },
  {
    q: "Stroke Action est-elle une organisation politique ou religieuse ?",
    a: "Non. Stroke Action est une organisation laïque, apolitique et à but non lucratif, œuvrant pour l'intérêt général. Nous accueillons membres et sympathisants de tous horizons.",
  },
  {
    q: "Comment contacter Stroke Action ?",
    a: "Par e-mail à contact@strokeaction.org, par téléphone au +237 652 14 81 47, à l'adresse Tradex Nkoabang à Yaoundé, ou via notre formulaire de contact.",
  },
  {
    q: "Comment les professionnels de santé peuvent-ils collaborer ?",
    a: "Nous accueillons les collaborations avec médecins, infirmiers, chercheurs et autres professionnels. Contactez-nous pour discuter des opportunités de partenariat.",
  },
  {
    q: "Où trouver les documents officiels de Stroke Action ?",
    a: "Nos documents clés (statuts, règlement intérieur, publications) sont téléchargeables sur la page Documents clés.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Comprendre l'AVC" }, { label: "FAQ" }]}
        eyebrow="FAQ"
        title="Questions fréquentes."
      />
      <section className="py-[clamp(3rem,7vw,5.5rem)]">
        <Container>
          <div className="max-w-[860px]">
            <Accordion items={QAS} />
          </div>
        </Container>
      </section>
    </>
  );
}
