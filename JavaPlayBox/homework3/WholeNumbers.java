package homework3;

//********************************************************************
//  WholeNumbers.java       Author: Lewis/Loftus
//
//  Solution to Programming Project 3.4 
//********************************************************************

import java.util.Scanner;

public class WholeNumbers
{
    //-----------------------------------------------------------------
    //  Computes and prints the whole numbers on either side (less
    //  than and greater than) a particular floating point value.
    //-----------------------------------------------------------------
    public static void main(String[] args)
    {
        double num;
        
        Scanner scan = new Scanner(System.in);

        System.out.print("Enter a floating point value: ");
        num = scan.nextDouble();

        System.out.println("Whole number less: " + (int) Math.floor(num));
        System.out.println("Whole number greater: " + (int) Math.ceil(num));

        scan.close();
    }
}

