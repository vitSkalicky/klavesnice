package com.android.inputmethod.latin.settings;


import android.app.AlertDialog;
import android.app.DialogFragment;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.ScrollView;
import android.widget.TextView;

import com.android.inputmethod.latin.R;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;


/**
 */
public class AboutFragment extends SubScreenFragment {


    public AboutFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        final View root = inflater.inflate(R.layout.fragment_about, container, false);

                Button licenseButton = root.findViewById(R.id.buttonLicense);
        licenseButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getActivity(),LicenseActivity.class);
                startActivity(intent);
            }
        });



        String versionName;
        try {
            versionName = getActivity().getPackageManager().getPackageInfo(getActivity().getPackageName(), 0).versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            versionName = "! Error !";
        }

        TextView textViewVersion = root.findViewById(R.id.textViewVersion);
        textViewVersion.setText(String.format(getText(R.string.version_text).toString(),versionName));

        return root;
    }
}
