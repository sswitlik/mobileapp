package pl.restrain.mobile;

import android.util.Log;
import android.webkit.WebView;

import androidx.annotation.NonNull;

import com.capacitorjs.plugins.pushnotifications.MessagingService;
import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.MessageHandler;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginResult;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONObject;

import java.util.UUID;

import io.ionic.backgroundrunner.plugin.BackgroundRunner;
import io.ionic.backgroundrunner.plugin.BackgroundRunnerPlugin;
import io.ionic.backgroundrunner.plugin.RunnerConfig;

import kotlinx.coroutines.*;
import org.json.JSONObject;


public class MyMessagingService extends MessagingService {

    public static Bridge capacitorBridge;

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        Log.d(MyMessagingService.class.getName(), "DUPA");
        super.onMessageReceived(remoteMessage);


        JSObject data = new JSObject();
        data.put("label", "pl.restrain.mobile.task");
        data.put("event", "notificationReceived");
        data.put("details", remoteMessage);

        RunnerConfig c = RunnerConfig.Companion.fromJSON(data);
        BackgroundRunner br = new BackgroundRunner(capacitorBridge.getContext());

//        try {
//
//        BackgroundRunnerPlugin plugin = (BackgroundRunnerPlugin) capacitorBridge.getPlugin("BackgroundRunner").getInstance();
//
//        JSObject data = new JSObject();
//        data.put("label", "pl.restrain.mobile.task");
//        data.put("event", "notificationReceived");
//        data.put("details", remoteMessage);
//
//        PluginCall call = new PluginCall(null, "BackgroundRunner",  UUID.randomUUID().toString(), "dispatchEvent", data);
//        plugin.dispatchEvent(call);
//        } catch (Exception e) {
//            Log.d(MyMessagingService.class.getName(), "ERROR");
//        }
    }

    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);
    }


//    private void showNotification(String title, String body) {
//        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
//        String channelId = "default_channel_id";
//
//        // For Android 8+ you need a NotificationChannel
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//            NotificationChannel channel = new NotificationChannel(
//                    channelId,
//                    "Default Channel",
//                    NotificationManager.IMPORTANCE_DEFAULT
//            );
//            notificationManager.createNotificationChannel(channel);
//        }
//
//        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, channelId)
//                .setContentTitle(title)
//                .setContentText(body)
//                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
//                .setAutoCancel(true);
//
//        notificationManager.notify(1001, builder.build());
//    }

//    class MockMessageHandler extends MessageHandler {
//        public MockMessageHandler() {
//            super(null, null, null);
//        }
//
//        public void sendResponseMessage(PluginCall call, PluginResult successResult, PluginResult errorResult) {
//            Log.d(MyMessagingService.class.getName(), "END");
//        }
//    }
}
