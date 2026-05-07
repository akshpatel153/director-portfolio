import { PhotographyGrid } from '../components/sections/PhotographyGrid';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionWipe } from '../components/ui/SectionWipe';

export function Photography() {
  return (
    <PageTransition>
      <SectionWipe color="bg-primary-yellow">
        <div className="pt-8 bg-[#121212] min-h-screen">
          <PhotographyGrid />
        </div>
      </SectionWipe>
    </PageTransition>
  );
}
