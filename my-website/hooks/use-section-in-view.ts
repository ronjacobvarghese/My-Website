import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

import { useActiveSectionContext } from '@/context/ActiveSectionProvider';
import { links } from "@/lib/data";

type useSectionInViewProps =  (typeof links)[number]["name"];


export default function useSectionInView(sectionName:useSectionInViewProps, threshold = 0.5) {
  const { ref, inView } = useInView({
    threshold: threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, timeOfLastClick]);

  return {ref}
}
