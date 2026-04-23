<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Banner;
use App\Models\Card;
use Inertia\Inertia;

class WhyChooseUsController extends Controller
{
    public function index()
    {
        $banners = Banner::orderBy('id', 'asc')->paginate(5);
        return Inertia::render('Home/WhyChooseUs/Banner/Index', [
            'banners' => $banners
        ]);
    }

    public function create()
    {
        return Inertia::render('Home/WhyChooseUs/Banner/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
            'title' => 'required|string|max:255',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('why-choose-us', 'public');
        }

        Banner::create([
            'image' => $imagePath,
            'title' => $request->title,
        ]);

        return redirect()->route('banner')->with('success', 'Banner created successfully');
    }

    public function edit($id)
    {
        $banner = Banner::findOrFail($id);
        return Inertia::render('Home/WhyChooseUs/Banner/Edit', [
            'banner' => $banner
        ]);
    }

    public function update(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);

        $data = $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
            'title' => 'required|string|max:255',
        ]);

        // Handle image
        if ($request->hasFile('image')) {

            if ($banner->image && Storage::disk('public')->exists($banner->image)) {
                Storage::disk('public')->delete($banner->image);
            }

            $data['image'] = $request->file('image')->store('why-choose-us', 'public');

        } else {
            unset($data['image']);
        }

        $banner->update($data);

        return redirect()->route('banner')
            ->with('success', 'Banner updated successfully');
    }

    public function destroy($id)
    {
        $banner = Banner::findOrFail($id);
        $banner->delete();

        return redirect()->back()->with('success', 'Banner deleted successfully');
    }


    public function cardIndex()
    {
        $cards = Card::orderBy('id', 'asc')->paginate(5);
        return Inertia::render('Home/WhyChooseUs/Card/Index', [
            'cards' => $cards
        ]);
    }



    public function cardCreate()
    {
        $banners = Banner::select('id', 'title')->get();

        return Inertia::render('Home/WhyChooseUs/Card/Create', [
            'banners' => $banners
        ]);
    }

    public function cardStore(Request $request)
    {
        $request->validate([
            'banner_id' => 'required|exists:banners,id',
            'icon' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('cards', 'public');
        }

        Card::create([
            'banner_id' => $request->banner_id,
            'icon' => $request->icon,
            'title' => $request->title,
            'image' => $imagePath,
        ]);

        return redirect()->route('card')->with('success', 'Card created successfully');
    }
    public function cardEdit($id)
    {
        $card = Card::findOrFail($id);
        $banners = Banner::select('id', 'title')->get();

        return Inertia::render('Home/WhyChooseUs/Card/Edit', [
            'card' => $card,
            'banners' => $banners
        ]);
    }


    public function cardUpdate(Request $request, $id)
    {
        $card = Card::findOrFail($id);

        $data = $request->validate([
            'banner_id' => 'required|exists:banners,id',
            'icon' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        // Handle image
        if ($request->hasFile('image')) {

            if ($card->image && Storage::disk('public')->exists($card->image)) {
                Storage::disk('public')->delete($card->image);
            }

            $data['image'] = $request->file('image')->store('cards', 'public');

        } else {
            unset($data['image']);
        }

        $card->update($data);

        return redirect()->route('card')
            ->with('success', 'Card updated successfully');
    }

    public function cardDestroy($id)
    {
        $card = Card::findOrFail($id);
        $card->delete();

        return redirect()->back()->with('success', 'Card deleted successfully');
    }
}
