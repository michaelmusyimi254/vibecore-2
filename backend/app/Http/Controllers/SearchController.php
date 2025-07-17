<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type', 'trainers');
        $region = $request->query('region', '');

        // Mock data for demonstration
        $data = [
            'trainers' => [
                [
                    'id' => 1,
                    'name' => 'Sarah Johnson',
                    'specialty' => 'Personal Training',
                    'location' => 'Downtown Fitness Center',
                    'rating' => 4.9,
                    'reviews' => 127,
                    'price' => '$45/session',
                    'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=face',
                    'tags' => ['Weight Loss', 'Strength Training', 'Nutrition'],
                ],
                [
                    'id' => 2,
                    'name' => 'Mike Chen',
                    'specialty' => 'Yoga Instructor',
                    'location' => 'Zen Wellness Studio',
                    'rating' => 4.8,
                    'reviews' => 89,
                    'price' => '$35/session',
                    'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
                    'tags' => ['Hatha Yoga', 'Meditation', 'Flexibility'],
                ],
            ],
            'facilities' => [
                [
                    'id' => 1,
                    'name' => 'Elite Fitness Center',
                    'type' => 'Gym',
                    'location' => '123 Main St, Downtown',
                    'status' => 'Open',
                    'rating' => 4.6,
                    'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
                    'tags' => ['24/7', 'Pool', 'Sauna', 'Personal Training'],
                ],
            ],
            'shops' => [
                [
                    'id' => 1,
                    'name' => 'FitGear Pro',
                    'category' => 'Equipment',
                    'location' => 'Online & 2 stores',
                    'rating' => 4.5,
                    'image' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
                    'featured' => 'Premium Dumbbells - 20% Off',
                ],
            ],
            'events' => [
                [
                    'id' => 1,
                    'title' => 'Morning Yoga Flow',
                    'date' => 'Dec 15, 2024',
                    'time' => '7:00 AM',
                    'location' => 'Central Park',
                    'price' => 'Free',
                    'spots' => '15 spots left',
                    'image' => 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop',
                ],
            ],
        ];

        // Optionally filter by type
        $response = [
            'trainers' => $type === 'trainers' || $type === '' ? $data['trainers'] : [],
            'facilities' => $type === 'facilities' ? $data['facilities'] : [],
            'shops' => $type === 'shops' ? $data['shops'] : [],
            'events' => $type === 'events' ? $data['events'] : [],
        ];

        return response()->json($response);
    }
}
