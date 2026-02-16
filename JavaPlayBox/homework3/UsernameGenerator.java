package homework3;


//********************************************************************
//  UsernameGenerator.java       Author: Lewis/Loftus
//
//  Solution to Programming Project 3.1 
//********************************************************************

import java.util.Scanner;
import java.util.Random;

public class UsernameGenerator {
    //-----------------------------------------------------------------
    //  Produces a username based on the user's first and last names.
    //  Assumes the last name is at least five characters longs.
    //-----------------------------------------------------------------
    public static void main(String[] args)
    {
        String first, last, username;
        Scanner scan = new Scanner(System.in);
        Random rand = new Random();

        System.out.print("Enter your first name: ");
        first = scan.nextLine();
        System.out.print("Enter your last name: ");
        last = scan.nextLine();

        username = first.charAt(0) + last.substring(0, 5) +
                (rand.nextInt(90) + 10);

        System.out.println("Username: " + username);

        scan.close();
    }
}

