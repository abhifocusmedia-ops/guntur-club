export function SectionLineArt() {
  return (
    <div className="section-line-art" aria-hidden="true">
      <svg viewBox="0 0 1200 720" preserveAspectRatio="none">
        <g className="section-line-arch">
          <path d="M820 720V438c0-132 107-239 239-239s239 107 239 239v282" />
          <path d="M854 720V448c0-113 92-205 205-205s205 92 205 205v272" />
          <path d="M885 720V461c0-96 78-174 174-174s174 78 174 174v259" />
          <path d="M804 468h488M830 438h438M868 720V520M916 720V490M1236 720V520M1188 720V490" />
        </g>
        <path className="section-line-detail" d="M50 60h210M50 70h140M50 80h76M50 60v150M60 60v112" />
        <path className="section-line-sweep" d="M-40 660C185 450 332 742 566 565c163-123 259-261 525-238" />
        <path className="section-line-sweep section-line-sweep-two" d="M-40 690C180 485 344 770 580 594c170-126 268-267 540-244" />
      </svg>
    </div>
  );
}
