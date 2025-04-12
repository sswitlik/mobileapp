package pl.restrain.mobile;


import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;
import android.webkit.WebView;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.capacitorjs.plugins.pushnotifications.MessagingService;
import com.getcapacitor.Bridge;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.JSObject;
import com.getcapacitor.MessageHandler;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginResult;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;

import io.ionic.backgroundrunner.plugin.BackgroundRunner;
import kotlinx.coroutines.*;
import org.json.JSONObject;


public class MyMessagingService extends MessagingService {

    public static Bridge capacitorBridge;

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        Log.d(MyMessagingService.class.getName(), "DUPA");
        super.onMessageReceived(remoteMessage);

        try {
            URL url = new URL("https://bb53-80-94-27-69.ngrok-free.app/confirm");
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            try {
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());
//            readStream(in);
            } finally {
                urlConnection.disconnect();
            }
        } catch (Exception e) {
            Log.d(MyMessagingService.class.getName(), "ERROR");
        }

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "my_channel_id")
                .setSmallIcon(R.drawable.favicon)
                .setContentTitle(remoteMessage.getData().get("title"))
                .setContentText(remoteMessage.getData().get("body"))
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);
        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
            Log.d(MyMessagingService.class.getName(), "notify");
            notificationManager.notify(1, builder.build());
        }
    }

    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);
    }

    public static void createNotificationChannel(BridgeActivity mainActivity) {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is not in the Support Library.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "my_channel_id";
            String description = "R.string.channel_description";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel("my_channel_id", name, NotificationManager.IMPORTANCE_HIGH);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this.
            NotificationManager notificationManager = mainActivity.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
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
