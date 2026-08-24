import type { BandMember as BandMemberType } from "../data/band";

interface BandMemberProps {
  member: BandMemberType;
}

export function BandMember({ member }: BandMemberProps) {
  return (
    <div className="border-2 border-white bg-black p-4 font-mono text-white flex flex-col justify-between shadow-[4px_4px_0px_#FFFFFF] hover:shadow-[6px_6px_0px_#00F5D4] transition-all">
      {/* Photo Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 border-2 border-white mb-4">
        <img
          src={member.photoUrl || "/RefrenceImages/band-member-portrait.jpg"}
          alt={member.name}
          className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/Band Logo/band-icon.png";
          }}
        />
        <div className="absolute bottom-2 left-2 bg-black px-2 py-0.5 border border-white text-[10px] uppercase font-bold text-[#00F5D4]">
          {member.role}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h4 className="text-xl font-display font-black uppercase text-white tracking-[-0.04em]">
          {member.name}
        </h4>
        {member.bio && (
          <p className="text-xs text-neutral-400 uppercase leading-relaxed">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}

export default BandMember;
