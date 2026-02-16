import java.util.Scanner;

public class timePieriodConverter {
    public static void main(String[] args) {

        //Enter the number of seconds: 3661
        //Time period of 3661 seconds is 01:01:01 expressed in hours/minutes/seconds.
        Scanner scan = new Scanner(System.in);
        System.out.print("Enter the number of seconds: ");
        int sec = scan.nextInt();
        int[] remainders = new int[3];
        int i = 2;
        // quotient should not less than 0;
        while(i >= 0) {
            remainders[i] = sec%60;
            sec = sec/60;
            i--;
        }

        System.out.println(String.format("%02d", remainders[0])+ ":" +String.format("%02d", remainders[1])+ ":" + String.format("%02d", remainders[2]));

        scan.close();
    }
}


/*
//********************************************************************
//  Seconds2.java       Author: Lewis/Loftus
//
//  Solution to Programming Project 2.9
//********************************************************************

import java.util.Scanner;

public class Seconds2
{
    //-----------------------------------------------------------------
    //  Computes the number of hours, minutes, and seconds that are
    //  equivalent to the number of seconds entered by the user.
    //-----------------------------------------------------------------
    public static void main(String[] args)
    {
        final int SECONDS_PER_HOUR = 3600;
        final int SECONDS_PER_MINUTE = 60;

        int totalSeconds, seconds, minutes, hours;

        Scanner scan = new Scanner(System.in);

        System.out.print("Enter the number of seconds: ");
        totalSeconds = seconds = scan.nextInt();

        hours = seconds / SECONDS_PER_HOUR;

        seconds = seconds % SECONDS_PER_HOUR;  // remaining seconds

        minutes = seconds / SECONDS_PER_MINUTE;

        seconds = seconds % SECONDS_PER_MINUTE;  // remaining seconds

*/
