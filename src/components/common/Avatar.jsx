import { getInitials } from '../../utils/helpers';

export const Avatar = ({ name, avatar, size = 40, online = false }) => {
  return (
    <div className="relative inline-block">
      <div
        className="rounded-full bg-blue-500 text-white flex items-center justify-center font-bold"
        style={{ width: size, height: size, fontSize: size / 2.5 }}
      >
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
        ) : (
          getInitials(name)
        )}
      </div>
      {online && (
        <span
          className="absolute bottom-0 right-0 bg-green-500 rounded-full border-2 border-white"
          style={{ width: size / 4, height: size / 4 }}
        />
      )}
    </div>
  );
};
