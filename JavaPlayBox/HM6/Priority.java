package HM6;

//********************************************************************
//  Priority.java       Author: Lewis/Loftus
//
//  Solution to Programming Project 7.5, 7.6, and 7.7
//********************************************************************

public interface Priority
{
    static final int MED_PRIORITY = 5;
    static final int MAX_PRIORITY = 10;
    static final int MIN_PRIORITY = 1;

    //-----------------------------------------------------------------
    //  Sets the object's priority level.
    //-----------------------------------------------------------------
    public void setPriority(int value);

    //-----------------------------------------------------------------
    //  Returns the object's priority level.
    //-----------------------------------------------------------------
    public int getPriority();
}

