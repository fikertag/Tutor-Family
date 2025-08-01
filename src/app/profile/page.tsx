import { tutors } from "../tutors";

const user = tutors[0];

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto bg-card p-8 rounded-xl shadow mt-10">
      <div className="flex flex-col items-center">
        <img
          src={user.image}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover mb-4 shadow"
        />
        <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
        <div className="text-sm text-muted-foreground mb-2">{user.subject}</div>
        <div className="text-sm text-muted-foreground mb-2">
          {user.location}
        </div>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500">★</span>
          <span className="font-semibold">{user.rating}</span>
        </div>
        <p className="text-base text-card-foreground mb-4 text-center max-w-md">
          {user.description}
        </p>
        <div className="bg-muted rounded-lg p-4 w-full text-left">
          <h3 className="font-semibold mb-2">About {user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.bio}</p>
        </div>
      </div>
    </div>
  );
}
