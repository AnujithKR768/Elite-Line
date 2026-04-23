<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CompanyProfile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyProfileController extends Controller
{
    // INDEX
    public function index()
    {
        $profile = CompanyProfile::orderBy('id', 'asc')->paginate(5);

        return Inertia::render('about/profile/index', [
            'profile' => $profile
        ]);
    }

    // CREATE PAGE
    public function add()
    {
        return Inertia::render('about/profile/create');
    }

    // STORE
    public function store(Request $request)
    {
        $data = $request->validate([
            'company_name' => 'required|string|max:255',
            'intro' => 'required|string',
            'description' => 'required|string',
            'expertise' => 'required|array|min:1',
            'expertise.*' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('company', 'public');
        }

        CompanyProfile::create($data);

        return redirect()->route('Profile')
            ->with('success', 'Company Profile Created Successfully');
    }

    // EDIT
    public function edit($id)
    {
        return Inertia::render('about/profile/edit', [
            'profile' => CompanyProfile::findOrFail($id)
        ]);
    }

    // UPDATE (MAIN FIX)
    public function update(Request $request, $id)
    {
        $profile = CompanyProfile::findOrFail($id);

        $data = $request->validate([
            'company_name' => 'required|string|max:255',
            'intro' => 'required|string',
            'description' => 'required|string',
            'expertise' => 'required|array',
            'expertise.*' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',
        ]);

        if ($request->hasFile('image')) {

            if ($profile->image && Storage::disk('public')->exists($profile->image)) {
                Storage::disk('public')->delete($profile->image);
            }

            $data['image'] = $request->file('image')->store('company', 'public');

        } else {
            unset($data['image']);
        }

        $profile->update($data);

        return redirect()->route('Profile')
            ->with('success', 'Profile Updated Successfully');
    }

    // DELETE
    public function destroy($id)
    {
        $profile = CompanyProfile::findOrFail($id);

        if ($profile->image) {
            Storage::disk('public')->delete($profile->image);
        }

        $profile->delete();

        return back()->with('success', 'Profile deleted successfully');
    }
}
