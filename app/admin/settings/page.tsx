import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <p className="text-muted-foreground text-sm">
        Раздел-заглушка для будущих настроек панели.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Безопасность</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">TODO:</strong> полноценная
            авторизация и проверка роли <code className="rounded bg-muted px-1">ADMIN</code> в
            middleware, а не только в API-обработчиках.
          </p>
          <p>
            Сейчас доступ к <code className="rounded bg-muted px-1">/admin</code> ограничен
            флагом{" "}
            <code className="rounded bg-muted px-1">ADMIN_PANEL_ENABLED=true</code> и
            сессией пользователя с ролью ADMIN в PostgreSQL.
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
