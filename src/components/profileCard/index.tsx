import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Coins } from 'lucide-react';
import { FC } from 'react';

export const ProfileCard: FC = function () {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src="/placeholder.svg?height=80&width=80"
            alt="User's avatar"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl">John Doe</CardTitle>
          <p className="text-muted-foreground">
            Adventurous coder and problem solver
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="font-medium">Code Master</p>
                <p className="text-sm text-muted-foreground">
                  Completed 100 coding challenges
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="font-medium">Bug Squasher</p>
                <p className="text-sm text-muted-foreground">
                  Fixed 50 critical bugs
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-blue-500 bg-blue-100">
              <Medal className="w-4 h-4 mr-1" />
              JavaScript Guru
            </Badge>
            <Badge variant="secondary" className="text-green-500 bg-green-100">
              <Medal className="w-4 h-4 mr-1" />
              React Expert
            </Badge>
            <Badge
              variant="secondary"
              className="text-purple-500 bg-purple-100"
            >
              <Medal className="w-4 h-4 mr-1" />
              CSS Wizard
            </Badge>
            <Badge variant="secondary" className="text-red-500 bg-red-100">
              <Medal className="w-4 h-4 mr-1" />
              Performance Optimizer
            </Badge>
          </div>
        </section>
        <section className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Coin Balance</h2>
          <div className="flex items-center gap-2">
            <Coins className="w-6 h-6 text-yellow-500" />
            <span className="text-2xl font-bold">1,250</span>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};
