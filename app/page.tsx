import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TranslationPanel } from "@/components/translation-panel";
import { Footer } from "@/components/footer";
import { MedicalReportPanel } from "@/components/medical-report-panel";
import { ChatWidget } from "@/components/chat/chat-widget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      <section id="translator" className="py-16 md:py-24 translator-gradient">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl gradient-text">
              Start Translating
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Select your languages, press the microphone button, and start
              speaking.
            </p>
          </div>

          <TranslationPanel />
        </div>
      </section>

      <section
        id="medical-analysis"
        className="py-16 md:py-24 medical-gradient"
      >
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl gradient-text">
              Medical Report Analysis
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Upload or paste your medical report to get a detailed analysis and
              explanation in simple terms.
            </p>
          </div>
          <MedicalReportPanel />
        </div>
      </section>

      <FeaturesSection />

      <Footer />
      <ChatWidget />
    </main>
  );
}
