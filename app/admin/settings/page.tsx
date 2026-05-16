import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <p className="text-muted-foreground text-sm">
        Настройки панели администратора.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Безопасность</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Доступ к <code className="rounded bg-muted px-1">/admin</code> разрешён только при{" "}
            <code className="rounded bg-muted px-1">ADMIN_PANEL_ENABLED=true</code> и активной
            сессии пользователя с ролью{" "}
            <code className="rounded bg-muted px-1">ADMIN</code> в PostgreSQL.
          </p>
          <p>
            Проверка выполняется в middleware и API-обработчиках. Публичные страницы сайта не
            используют этот layout.
          </p>
        </CardContent>
      </Card>
      <Separator />
      <p className="text-xs text-muted-foreground">
        Публичные страницы сайта не используют этот layout и не меняют свой
        внешний вид.
      </p>
    </div>
  );
}
