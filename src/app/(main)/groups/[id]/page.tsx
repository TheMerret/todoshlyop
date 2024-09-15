import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { TasksTable } from '@/components/tasksTable';
import { GroupAdminDashboard } from '@/components/groupAdminDashboard';

interface GroupParams {
  params: {
    id: number;
  };
}

export default function Group({ params }: GroupParams) {
  return (
    <div className="flex flex-col gap-y-6">
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Группа {params.id}
      </h3>
      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Задачи</TabsTrigger>
          <TabsTrigger value="admin">Администрирование</TabsTrigger>
        </TabsList>
        <div className="flex flex-wrap justify-between"></div>
        <TabsContent value="tasks">
          <TasksTable tasks={[]}></TasksTable>
        </TabsContent>
        <TabsContent value="admin">
          <GroupAdminDashboard></GroupAdminDashboard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
