import { Card } from "@/components/ui/card";
import { Search, MessageSquare, CreditCard, Download } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse Artists",
      description: "Explore portfolios of talented digital artists and find the perfect match for your vision",
      color: "bg-primary"
    },
    {
      icon: MessageSquare,
      title: "Discuss Your Ideas",
      description: "Share your concept, references, and requirements with your chosen artist",
      color: "bg-secondary"
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Pay safely through our platform. Artists receive payment upon delivery confirmation",
      color: "bg-accent"
    },
    {
      icon: Download,
      title: "Receive Your Art",
      description: "Download your custom artwork in high resolution and enjoy your unique creation",
      color: "bg-primary-glow"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It <span className="bg-gradient-creative bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting your custom artwork is simple and secure. Follow these easy steps to commission your perfect piece.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative p-8 text-center hover:shadow-creative transition-all duration-300 group">
              {/* Step Number */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-gradient-creative rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              
              {/* Icon */}
              <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              
              {/* Connection Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gradient-creative opacity-50"></div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;